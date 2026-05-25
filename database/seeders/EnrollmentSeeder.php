<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class EnrollmentSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $enrollmentData = [
            [1, 'Kindergarten', 59, 61],
            [1, 'Grade 1', 79, 54],
            [1, 'Grade 2', 60, 47],
            [1, 'Grade 3', 66, 66],
            [1, 'Grade 4', 80, 75],
            [1, 'Grade 5', 56, 50],
            [1, 'Grade 6', 46, 53],
            [2, 'Kindergarten', 51, 66],
            [2, 'Grade 1', 81, 75],
            [2, 'Grade 2', 78, 53],
            [2, 'Grade 3', 62, 49],
            [2, 'Grade 4', 54, 54],
            [2, 'Grade 5', 70, 69],
            [2, 'Grade 6', 60, 57],
            [3, 'Kindergarten', 42, 70],
            [3, 'Grade 1', 79, 73],
            [3, 'Grade 2', 68, 51],
            [3, 'Grade 3', 63, 47],
            [3, 'Grade 4', 53, 57],
            [3, 'Grade 5', 71, 71],
            [3, 'Grade 6', 59, 54],
            [4, 'Kindergarten', 51, 64],
            [4, 'Grade 1', 58, 77],
            [4, 'Grade 2', 68, 69],
            [4, 'Grade 3', 71, 64],
            [4, 'Grade 4', 58, 49],
            [4, 'Grade 5', 43, 45],
            [4, 'Grade 6', 69, 76],
            [5, 'Kindergarten', 48, 46],
            [5, 'Grade 1', 59, 55],
            [5, 'Grade 2', 60, 70],
            [5, 'Grade 3', 62, 77],
            [5, 'Grade 4', 72, 51],
            [5, 'Grade 5', 56, 43],
            [5, 'Grade 6', 53, 63],
        ];

        $records = array_map(function ($row) use ($now) {
            return [
                'school_year_id' => $row[0],
                'grade_level' => $row[1],
                'male_students' => $row[2],
                'female_students' => $row[3],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $enrollmentData);

        DB::table('enrollments')->insert($records);
    }
}
