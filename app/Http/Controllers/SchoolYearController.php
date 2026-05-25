<?php

namespace App\Http\Controllers;

use App\Models\SchoolYear;
use Illuminate\Http\Request;

class SchoolYearController extends Controller
{
    public function index()
    {
        return SchoolYear::with(['enrollments', 'dropoutRepeaters', 'classrooms', 'teachers'])->get();
    }

    public function create()
    {
        abort(404);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'year' => 'required|string|unique:school_years,year',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        return SchoolYear::create($data);
    }

    public function show(SchoolYear $schoolYear)
    {
        return $schoolYear->load(['enrollments', 'dropoutRepeaters', 'classrooms', 'teachers']);
    }

    public function edit(SchoolYear $schoolYear)
    {
        abort(404);
    }

    public function update(Request $request, SchoolYear $schoolYear)
    {
        $data = $request->validate([
            'year' => 'required|string|unique:school_years,year,' . $schoolYear->id,
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        $schoolYear->update($data);

        return $schoolYear;
    }

    public function destroy(SchoolYear $schoolYear)
    {
        $schoolYear->delete();

        return response()->noContent();
    }
}
