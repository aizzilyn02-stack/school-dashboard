<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Keep light UI only; dark-mode removed --}}
        <style>
            /* Minimal reset and strong overrides to ensure header/sidebar stay light-only.
               Uses !important to override compiled CSS that targets prefers-color-scheme or .dark variants. */
            html { background-color: #ffffff; color-scheme: light; }
            header, header * { background-color: #ffffff !important; color: #0f172a !important; border-color: #e5e7eb !important; }
            aside, aside * { background-color: #ffffff !important; color: #0f172a !important; border-color: #e5e7eb !important; }
            /* Ensure form controls and common UI primitives remain light */
            header input, header select, header button, aside input, aside select, aside button { background-color: #ffffff !important; color: #0f172a !important; }
        </style>

        {{-- Force light appearance at the earliest opportunity to override compiled scripts --}}
        <script>
            (function() {
                try {
                    localStorage.setItem('appearance', 'light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                } catch (e) {
                    // ignore
                }
            })();
        </script>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
