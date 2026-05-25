<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DropoutRepeaterSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $dropoutData = [
            [1, 'All Grades', 0, 0, 852],
            [2, 'All Grades', 52, 0, 879],
            [3, 'All Grades', 0, 0, 858],
            [4, 'All Grades', 0, 0, 862],
            [5, 'All Grades', 0, 0, 815],
        ];

        $records = array_map(function ($row) use ($now) {
            return [
                'school_year_id' => $row[0],
                'grade_level' => $row[1],
                'dropouts' => $row[2],
                'repeaters' => $row[3],
                'total_students' => $row[4],
                // rates are computed dynamically
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $dropoutData);

        DB::table('dropout_repeaters')->insert($records);
    }
}
