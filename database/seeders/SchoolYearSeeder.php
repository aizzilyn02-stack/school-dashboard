<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class SchoolYearSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('school_years')->insert([
            ['year' => '2021-2022', 'start_date' => '2021-08-01', 'end_date' => '2022-06-30', 'created_at' => $now, 'updated_at' => $now],
            ['year' => '2022-2023', 'start_date' => '2022-08-01', 'end_date' => '2023-06-30', 'created_at' => $now, 'updated_at' => $now],
            ['year' => '2023-2024', 'start_date' => '2023-08-01', 'end_date' => '2024-06-30', 'created_at' => $now, 'updated_at' => $now],
            ['year' => '2024-2025', 'start_date' => '2024-08-01', 'end_date' => '2025-06-30', 'created_at' => $now, 'updated_at' => $now],
            ['year' => '2025-2026', 'start_date' => '2025-08-01', 'end_date' => '2026-06-30', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
