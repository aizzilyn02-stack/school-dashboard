<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    public function index()
    {
        return Classroom::with(['schoolYear', 'building'])->get();
    }

    public function create()
    {
        abort(404);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'room_name' => 'required|string',
            'grade_level' => 'required|string',
            'seating_capacity' => 'required|integer|min:0',
            'current_students' => 'required|integer|min:0',
            'building_id' => 'required|exists:buildings,id',
        ]);

        return Classroom::create($data);
    }

    public function show(Classroom $classroom)
    {
        return $classroom->load(['schoolYear', 'building']);
    }

    public function edit(Classroom $classroom)
    {
        abort(404);
    }

    public function update(Request $request, Classroom $classroom)
    {
        $data = $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'room_name' => 'required|string',
            'grade_level' => 'required|string',
            'seating_capacity' => 'required|integer|min:0',
            'current_students' => 'required|integer|min:0',
            'building_id' => 'required|exists:buildings,id',
        ]);

        $classroom->update($data);

        return $classroom;
    }

    public function destroy(Classroom $classroom)
    {
        $classroom->delete();

        return response()->noContent();
    }
}
