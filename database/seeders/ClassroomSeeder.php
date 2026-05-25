<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ClassroomSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $classroomData = [
            [1, 'Kindergarten', 2, 122, 120],
            [1, 'Grade 1', 4, 137, 133],
            [1, 'Grade 2', 3, 110, 107],
            [1, 'Grade 3', 3, 132, 132],
            [1, 'Grade 4', 5, 155, 155],
            [1, 'Grade 5', 4, 86, 106],
            [1, 'Grade 6', 3, 102, 99],
            [2, 'Kindergarten', 2, 117, 117],
            [2, 'Grade 1', 4, 156, 156],
            [2, 'Grade 2', 3, 131, 131],
            [2, 'Grade 3', 3, 111, 111],
            [2, 'Grade 4', 3, 108, 108],
            [2, 'Grade 5', 4, 139, 139],
            [2, 'Grade 6', 3, 117, 117],
            [3, 'Kindergarten', 2, 112, 112],
            [3, 'Grade 1', 5, 152, 152],
            [3, 'Grade 2', 4, 119, 119],
            [3, 'Grade 3', 3, 110, 110],
            [3, 'Grade 4', 3, 110, 110],
            [3, 'Grade 5', 4, 142, 142],
            [3, 'Grade 6', 3, 116, 113],
            [4, 'Kindergarten', 2, 115, 115],
            [4, 'Grade 1', 5, 135, 135],
            [4, 'Grade 2', 4, 137, 137],
            [4, 'Grade 3', 4, 135, 135],
            [4, 'Grade 4', 3, 107, 107],
            [4, 'Grade 5', 3, 88, 88],
            [4, 'Grade 6', 4, 145, 145],
            [5, 'Kindergarten', 2, 94, 94],
            [5, 'Grade 1', 5, 114, 114],
            [5, 'Grade 2', 4, 130, 130],
            [5, 'Grade 3', 4, 139, 139],
            [5, 'Grade 4', 4, 123, 123],
            [5, 'Grade 5', 3, 99, 99],
            [5, 'Grade 6', 3, 116, 116],
        ];

        $records = [];

        foreach ($classroomData as $index => $row) {
            $yearId = $row[0];
            $roomCount = $row[2];
            $capacity = $row[3];
            $students = $row[4];
            $buildingId = ($index % 10) + 1;
            $capacityPerRoom = max(1, (int) ceil($capacity / $roomCount));
            $studentsPerRoom = max(0, (int) ceil($students / $roomCount));

            for ($i = 1; $i <= $roomCount; $i++) {
                $records[] = [
                    'school_year_id' => $yearId,
                    'room_name' => sprintf('%s Room %d', $row[1], $i),
                    'grade_level' => $row[1],
                    'seating_capacity' => $capacityPerRoom,
                    'current_students' => $studentsPerRoom,
                    'building_id' => $buildingId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
        }

        DB::table('classrooms')->insert($records);
    }
}
