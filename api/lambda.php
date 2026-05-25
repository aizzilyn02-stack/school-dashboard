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

    // Force cookie sessions on Vercel to avoid relying on an ephemeral SQLite sessions table.
    putenv('SESSION_DRIVER=cookie');
    $_ENV['SESSION_DRIVER'] = 'cookie';
    $_SERVER['SESSION_DRIVER'] = 'cookie';
}

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
