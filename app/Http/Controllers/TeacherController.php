<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        return Teacher::with('schoolYear')->get();
    }

    public function create()
    {
        abort(404);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'teacher_name' => 'required|string',
            'grade_level' => 'required|string',
            'subject' => 'required|string',
            'students_assigned' => 'required|integer|min:0',
            'is_advisor' => 'required|boolean',
        ]);

        return Teacher::create($data);
    }

    public function show(Teacher $teacher)
    {
        return $teacher->load('schoolYear');
    }

    public function edit(Teacher $teacher)
    {
        abort(404);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $data = $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'teacher_name' => 'required|string',
            'grade_level' => 'required|string',
            'subject' => 'required|string',
            'students_assigned' => 'required|integer|min:0',
            'is_advisor' => 'required|boolean',
        ]);

        $teacher->update($data);

        return $teacher;
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return response()->noContent();
    }
}
