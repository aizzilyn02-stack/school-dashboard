<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $teachersData = [
            [1, 'Kindergarten', 2],
            [1, 'Grade 1', 4],
            [1, 'Grade 2', 3],
            [1, 'Grade 3', 3],
            [1, 'Grade 4', 5],
            [1, 'Grade 5', 4],
            [1, 'Grade 6', 3],
            [2, 'Kindergarten', 2],
            [2, 'Grade 1', 4],
            [2, 'Grade 2', 3],
            [2, 'Grade 3', 3],
            [2, 'Grade 4', 3],
            [2, 'Grade 5', 4],
            [2, 'Grade 6', 3],
            [3, 'Kindergarten', 2],
            [3, 'Grade 1', 5],
            [3, 'Grade 2', 4],
            [3, 'Grade 3', 3],
            [3, 'Grade 4', 3],
            [3, 'Grade 5', 4],
            [3, 'Grade 6', 3],
            [4, 'Kindergarten', 2],
            [4, 'Grade 1', 5],
            [4, 'Grade 2', 4],
            [4, 'Grade 3', 4],
            [4, 'Grade 4', 3],
            [4, 'Grade 5', 3],
            [4, 'Grade 6', 4],
            [5, 'Kindergarten', 2],
            [5, 'Grade 1', 5],
            [5, 'Grade 2', 4],
            [5, 'Grade 3', 4],
            [5, 'Grade 4', 4],
            [5, 'Grade 5', 3],
            [5, 'Grade 6', 3],
        ];

        $subjects = ['Mathematics', 'Science', 'English', 'Filipino', 'Social Studies', 'MAPEH', 'EPP/TLE'];

        $enrollmentTotals = [
            1 => ['Kindergarten' => 120, 'Grade 1' => 133, 'Grade 2' => 107, 'Grade 3' => 132, 'Grade 4' => 155, 'Grade 5' => 106, 'Grade 6' => 99],
            2 => ['Kindergarten' => 117, 'Grade 1' => 156, 'Grade 2' => 131, 'Grade 3' => 111, 'Grade 4' => 108, 'Grade 5' => 139, 'Grade 6' => 117],
            3 => ['Kindergarten' => 112, 'Grade 1' => 152, 'Grade 2' => 119, 'Grade 3' => 110, 'Grade 4' => 110, 'Grade 5' => 142, 'Grade 6' => 113],
            4 => ['Kindergarten' => 115, 'Grade 1' => 135, 'Grade 2' => 137, 'Grade 3' => 135, 'Grade 4' => 107, 'Grade 5' => 88, 'Grade 6' => 145],
            5 => ['Kindergarten' => 94, 'Grade 1' => 114, 'Grade 2' => 130, 'Grade 3' => 139, 'Grade 4' => 123, 'Grade 5' => 99, 'Grade 6' => 116],
        ];

        $records = [];

        foreach ($teachersData as $row) {
            [$yearId, $grade, $count] = $row;
            $totalStudents = $enrollmentTotals[$yearId][$grade] ?? 30;
            $perTeacher = max(1, (int) ceil($totalStudents / $count));

            for ($i = 1; $i <= $count; $i++) {
                $subject = $subjects[($i - 1) % count($subjects)];
                $records[] = [
                    'school_year_id' => $yearId,
                    'teacher_name' => sprintf('Teacher %s%s', str_replace('Grade ', 'G', $grade), $i),
                    'grade_level' => $grade,
                    'subject' => $subject,
                    'students_assigned' => $perTeacher,
                    'is_advisor' => $i === 1 ? 1 : 0,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
        }

        DB::table('teachers')->insert($records);
    }
}
