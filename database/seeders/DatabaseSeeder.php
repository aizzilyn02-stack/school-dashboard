<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\SchoolYearSeeder;
use Database\Seeders\EnrollmentSeeder;
use Database\Seeders\DropoutRepeaterSeeder;
use Database\Seeders\BuildingSeeder;
use Database\Seeders\RoomSeeder;
use Database\Seeders\ClassroomSeeder;
use Database\Seeders\TeacherSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            SchoolYearSeeder::class,
            BuildingSeeder::class,
            RoomSeeder::class,
            EnrollmentSeeder::class,
            DropoutRepeaterSeeder::class,
            ClassroomSeeder::class,
            TeacherSeeder::class,
        ]);
    }
}
