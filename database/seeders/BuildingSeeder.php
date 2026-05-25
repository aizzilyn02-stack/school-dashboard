<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class BuildingSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $buildings = [
            ['Building 1', 1, 'Good', 1995, '2018'],
            ['Building 2', 1, 'Good', 1998, '2020'],
            ['Building 3', 1, 'Good', 2000, '2015'],
            ['Building 4', 1, 'Good', 2002, '2019'],
            ['Building 5', 1, 'Good', 2005, '2021'],
            ['Building 6', 1, 'Condemnable', 1990, '2010'],
            ['Building 7', 1, 'Needs Major Repair', 1992, '2012'],
            ['Building 8', 1, 'Needs Major Repair', 1993, '2013'],
            ['Building 9', 1, 'Good', 2003, '2020'],
            ['Building 10', 1, 'Good', 2004, '2021'],
            ['Building 11', 1, 'Good', 2006, '2022'],
            ['Building 12', 1, 'Good', 2007, '2022'],
            ['Building 13', 1, 'Good', 2008, '2023'],
            ['Building 14', 1, 'Good', 2009, '2023'],
            ['Building 15', 1, 'Needs Major Repair', 1994, '2014'],
            ['Building 16', 1, 'Needs Major Repair', 1995, '2015'],
        ];

        $records = array_map(function ($item) use ($now) {
            return [
                'building_name' => $item[0],
                'total_rooms' => $item[1],
                'condition' => $item[2],
                'year_built' => $item[3],
                'last_renovation' => $item[4],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $buildings);

        DB::table('buildings')->insert($records);
    }
}
