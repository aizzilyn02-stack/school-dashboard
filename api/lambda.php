<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

if (!empty(getenv('VERCEL'))) {
    $logChannel = getenv('LOG_CHANNEL');
    if ($logChannel === false || $logChannel === '') {
        putenv('LOG_CHANNEL=errorlog');
        $_ENV['LOG_CHANNEL'] = 'errorlog';
        $_SERVER['LOG_CHANNEL'] = 'errorlog';
    }

    $sourceDatabase = __DIR__.'/../database/database.sqlite';
    $tmpDatabase = '/tmp/database.sqlite';
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
            if (! file_exists($dest) || filemtime($sourcePath) > filemtime($dest)) {
                @copy($sourcePath, $dest);
                error_log("[lambda] Copied cache $sourcePath -> $dest");
            } else {
                error_log("[lambda] Cache dest exists and is up-to-date: $dest");
            }
        } else {
            // If no source cache exists in the repo, unset the env var so Laravel won't try to load a missing cache file.
            putenv($envKey.'=');
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
$app = require_once __DIR__.'/../bootstrap/app.php';

if (! empty(getenv('VERCEL'))) {
    $app->afterBootstrapping(
        \Illuminate\Foundation\Bootstrap\LoadConfiguration::class,
        function () use ($app, $tmpDatabase) {
            $app['config']->set('session.driver', 'cookie');
            $app['config']->set('database.connections.sqlite.database', $tmpDatabase);
        }
    );
}

$app->handleRequest(Request::capture());
