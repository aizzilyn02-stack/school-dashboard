<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

error_log('[lambda] boot start');
error_log('[lambda] cwd=' . getcwd());
error_log('[lambda] api path=' . __DIR__);
error_log('[lambda] root path=' . dirname(__DIR__));
error_log('[lambda] VERCEL=' . var_export(getenv('VERCEL'), true));
error_log('[lambda] initial APP_CONFIG_CACHE=' . var_export(getenv('APP_CONFIG_CACHE'), true));
error_log('[lambda] initial APP_ROUTES_CACHE=' . var_export(getenv('APP_ROUTES_CACHE'), true));
error_log('[lambda] initial VIEW_COMPILED_PATH=' . var_export(getenv('VIEW_COMPILED_PATH'), true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
error_log('[lambda] vendor/autoload exists=' . var_export(file_exists(__DIR__.'/../vendor/autoload.php'), true));
require __DIR__.'/../vendor/autoload.php';
error_log('[lambda] after composer autoload');

    // Prevent Laravel from loading potentially invalid cache paths in serverless envs.
    foreach (['APP_CONFIG_CACHE','APP_ROUTES_CACHE','APP_EVENTS_CACHE','APP_PACKAGES_CACHE','APP_SERVICES_CACHE','VIEW_COMPILED_PATH'] as $k) {
        putenv($k);
        unset($_ENV[$k], $_SERVER[$k]);
    }

    $tmpDirectory = file_exists('/tmp') ? '/tmp' : sys_get_temp_dir();
    foreach (['APP_CONFIG_CACHE','APP_ROUTES_CACHE','APP_EVENTS_CACHE','APP_PACKAGES_CACHE','APP_SERVICES_CACHE'] as $k) {
        $disabledPath = $tmpDirectory.'/laravel-disabled-'.strtolower($k).'.php';
        putenv("$k=$disabledPath");
        $_ENV[$k] = $disabledPath;
        $_SERVER[$k] = $disabledPath;
    }

    // Force cookie sessions early so config/session.php resolves to cookie on Vercel.
    putenv('SESSION_DRIVER=cookie');
    $_ENV['SESSION_DRIVER'] = 'cookie';
    $_SERVER['SESSION_DRIVER'] = 'cookie';
    error_log('[lambda] Early forced SESSION_DRIVER=' . getenv('SESSION_DRIVER'));
    error_log('[lambda] Disabled cache envs: ' . implode(', ', array_map(fn($k) => "$k=".getenv($k), ['APP_CONFIG_CACHE','APP_ROUTES_CACHE','APP_EVENTS_CACHE','APP_PACKAGES_CACHE','APP_SERVICES_CACHE'])));

if (!empty(getenv('VERCEL'))) {
    $logChannel = getenv('LOG_CHANNEL');
    if ($logChannel === false || $logChannel === '') {
        putenv('LOG_CHANNEL=errorlog');
        $_ENV['LOG_CHANNEL'] = 'errorlog';
        $_SERVER['LOG_CHANNEL'] = 'errorlog';
    }

    $sourceDatabase = __DIR__.'/../database/database.sqlite';
    $tmpDirectory = file_exists('/tmp') ? '/tmp' : sys_get_temp_dir();
    $tmpDatabase = $tmpDirectory.'/database.sqlite';
    if (file_exists($sourceDatabase)) {
        $shouldCopy = false;
        if (!file_exists($tmpDatabase) || filesize($tmpDatabase) === 0) {
            $shouldCopy = true;
        } elseif (filemtime($sourceDatabase) > filemtime($tmpDatabase)) {
            $shouldCopy = true;
        } else {
            try {
                $db = new PDO("sqlite:$tmpDatabase");
                $stmt = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='sessions'");
                if (! $stmt || $stmt->fetchColumn() === false) {
                    $shouldCopy = true;
                }
            } catch (Throwable) {
                $shouldCopy = true;
            }
        }

        if ($shouldCopy) {
            copy($sourceDatabase, $tmpDatabase);
        }
    } elseif (!file_exists($tmpDatabase)) {
        touch($tmpDatabase);
    }

    putenv("DB_DATABASE=$tmpDatabase");
    $_ENV['DB_DATABASE'] = $tmpDatabase;
    $_SERVER['DB_DATABASE'] = $tmpDatabase;

    // Ensure any APP_*_CACHE env vars pointing to /tmp have actual files.
    $cacheSources = [
        'APP_CONFIG_CACHE' => __DIR__.'/../bootstrap/cache/config.php',
        'APP_ROUTES_CACHE' => __DIR__.'/../bootstrap/cache/routes.php',
        'APP_EVENTS_CACHE' => __DIR__.'/../bootstrap/cache/events.php',
        'APP_PACKAGES_CACHE' => __DIR__.'/../bootstrap/cache/packages.php',
        'APP_SERVICES_CACHE' => __DIR__.'/../bootstrap/cache/services.php',
    ];

    foreach ($cacheSources as $envKey => $sourcePath) {
        $dest = getenv($envKey);
        if ($dest === false || $dest === '') {
            continue;
        }

        // If we have a local cached file in the repo, copy it to the /tmp destination.
        if (file_exists($sourcePath)) {
            // If the destination is a directory (or looks invalid), unset the env value.
            if (is_dir($dest)) {
                putenv($envKey);
                unset($_ENV[$envKey], $_SERVER[$envKey]);
                error_log("[lambda] Unset env $envKey because destination is a directory: $dest");
                continue;
            }

            // Ensure destination directory exists
            $destDir = dirname($dest);
            if ($destDir && ! file_exists($destDir)) {
                @mkdir($destDir, 0755, true);
            }

            if (! file_exists($dest) || filemtime($sourcePath) > filemtime($dest)) {
                $copied = @copy($sourcePath, $dest);
                if ($copied && is_file($dest)) {
                    error_log("[lambda] Copied cache $sourcePath -> $dest");
                } else {
                    // Copy failed or dest is not a file; unset env to avoid Laravel requiring a directory
                    putenv($envKey);
                    unset($_ENV[$envKey], $_SERVER[$envKey]);
                    error_log("[lambda] Failed to copy cache $sourcePath -> $dest; env unset");
                }
            } else {
                error_log("[lambda] Cache dest exists and is up-to-date: $dest");
            }
        } else {
            // If no source cache exists in the repo, unset the env var so Laravel won't try to load a missing cache file.
            putenv($envKey);
            unset($_ENV[$envKey], $_SERVER[$envKey]);
            error_log("[lambda] Unset env $envKey because source cache missing");
        }
    }

    // Ensure compiled view path exists when set to /tmp
    $viewCompiled = getenv('VIEW_COMPILED_PATH');
    if ($viewCompiled && ! file_exists($viewCompiled)) {
        @mkdir($viewCompiled, 0755, true);
    }

    error_log('[lambda] DB_DATABASE=' . getenv('DB_DATABASE'));
    error_log('[lambda] SESSION_DRIVER=' . getenv('SESSION_DRIVER'));

    // Force cookie sessions on Vercel to avoid relying on an ephemeral SQLite sessions table.
    putenv('SESSION_DRIVER=cookie');
    $_ENV['SESSION_DRIVER'] = 'cookie';
    $_SERVER['SESSION_DRIVER'] = 'cookie';
}

// Bootstrap Laravel and handle the request...
/** @var Application $app */
error_log('[lambda] bootstrap exists=' . var_export(file_exists(__DIR__.'/../bootstrap/app.php'), true));
$app = require_once __DIR__.'/../bootstrap/app.php';
error_log('[lambda] app booted');

if (! empty(getenv('VERCEL'))) {
    $app->afterBootstrapping(
        \Illuminate\Foundation\Bootstrap\LoadConfiguration::class,
        function () use ($app, $tmpDatabase) {
            error_log('[lambda] after LoadConfiguration bootstrap');
            $app['config']->set('session.driver', 'cookie');
            $app['config']->set('database.connections.sqlite.database', $tmpDatabase);
        }
    );
}

try {
    $response = $app->handleRequest(Request::capture());
    error_log('[lambda] request handled');
} catch (Throwable $e) {
    error_log('[lambda] handleRequest threw ' . $e::class . ': ' . $e->getMessage());
    error_log($e->getTraceAsString());
    throw $e;
}
