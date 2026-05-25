<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function index()
    {
        return Enrollment::with('schoolYear')->get();
    }

    public function create()
    {
        abort(404);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'grade_level' => 'required|string',
            'male_students' => 'required|integer|min:0',
            'female_students' => 'required|integer|min:0',
        ]);

        return Enrollment::create($data);
    }

    public function show(Enrollment $enrollment)
    {
        return $enrollment->load('schoolYear');
    }

    public function edit(Enrollment $enrollment)
    {
        abort(404);
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $data = $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'grade_level' => 'required|string',
            'male_students' => 'required|integer|min:0',
            'female_students' => 'required|integer|min:0',
        ]);

        $enrollment->update($data);

        return $enrollment;
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return response()->noContent();
    }
}
