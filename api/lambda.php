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

    $requestedDatabase = getenv('DB_DATABASE');
    if ($requestedDatabase === false || $requestedDatabase === '' || str_contains($requestedDatabase, 'database/database.sqlite')) {
        $tmpDatabase = '/tmp/database.sqlite';
        if (!file_exists($tmpDatabase)) {
            $sourceDatabase = __DIR__.'/../database/database.sqlite';
            if (file_exists($sourceDatabase)) {
                copy($sourceDatabase, $tmpDatabase);
            } else {
                touch($tmpDatabase);
            }
        }

        putenv("DB_DATABASE=$tmpDatabase");
        $_ENV['DB_DATABASE'] = $tmpDatabase;
        $_SERVER['DB_DATABASE'] = $tmpDatabase;
    }
}

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
