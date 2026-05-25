<?php

use App\Http\Controllers\BuildingController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DropoutRepeaterController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SchoolYearController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('school-years', SchoolYearController::class)->except(['create', 'edit']);
    Route::resource('enrollments', EnrollmentController::class)->except(['create', 'edit']);
    Route::resource('dropout-repeaters', DropoutRepeaterController::class)->except(['create', 'edit']);
    Route::resource('classrooms', ClassroomController::class)->except(['create', 'edit']);
    Route::resource('teachers', TeacherController::class)->except(['create', 'edit']);
    Route::resource('buildings', BuildingController::class)->except(['create', 'edit']);
    Route::resource('rooms', RoomController::class)->except(['create', 'edit']);
});

require __DIR__.'/settings.php';
