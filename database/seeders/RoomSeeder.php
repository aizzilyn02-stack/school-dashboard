<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $rooms = [
            [1, '1', 'Classroom', 8.2, 7.56, 'Good', 'Kindergarten'],
            [2, '3', 'Classroom', 18.255, 8.1, 'Good', 'Grade 1 & 4'],
            [3, '2', 'Classroom', 14.05, 7.02, 'Good', 'Grade 1 & Kindergarten'],
            [4, '4', 'Classroom', 19.7, 9.96, 'Good', 'Grade 4 & 6'],
            [5, '2', 'Support', 12.2, 7.1, 'Good', 'Clinic & Library'],
            [6, '3', 'Support', 29.5, 7.0, 'Condemnable', 'Social Hall & Canteen'],
            [7, '2', 'Support', 18.1, 8.5, 'Needs Major Repair', 'IA Room'],
            [8, '1', 'Support', 16.2, 7.7, 'Needs Major Repair', 'HE Room'],
            [9, '2', 'Classroom', 12.3, 7.8, 'Good', 'Grade 2'],
            [10, '3', 'Classroom', 24.7, 6.7, 'Good', 'Grade 5'],
            [11, '2', 'Support', 16.1, 7.4, 'Good', 'Math & Science'],
            [12, '1', 'Office', 7.2, 5.24, 'Good', 'Office'],
            [13, '2', 'Classroom', 16.24, 6.6, 'Good', 'Computer & Grade 4'],
            [14, '2', 'Classroom', 16.2, 6.6, 'Good', 'Grade 3 & 4'],
            [15, '2', 'Classroom', 16.2, 6.6, 'Needs Major Repair', 'Grade 3'],
            [16, '1', 'Office', 7.3, 5.1, 'Needs Major Repair', 'SBM Room'],
        ];

        $records = array_map(function ($row) use ($now) {
            return [
                'building_id' => $row[0],
                'room_number' => $row[1],
                'room_type' => $row[2],
                'length_m' => $row[3],
                'width_m' => $row[4],
                'area_sqm' => round($row[3] * $row[4], 2),
                'condition' => $row[5],
                'usage_category' => $row[6],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $rooms);

        DB::table('rooms')->insert($records);
    }
}
