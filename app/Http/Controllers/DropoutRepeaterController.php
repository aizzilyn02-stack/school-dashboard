<?php

namespace App\Http\Controllers;

use App\Models\DropoutRepeater;
use Illuminate\Http\Request;

class DropoutRepeaterController extends Controller
{
    public function index()
    {
        return DropoutRepeater::with('schoolYear')->get();
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
            'dropouts' => 'required|integer|min:0',
            'repeaters' => 'required|integer|min:0',
            'total_students' => 'required|integer|min:0',
        ]);

        return DropoutRepeater::create($data);
    }

    public function show(DropoutRepeater $dropoutRepeater)
    {
        return $dropoutRepeater->load('schoolYear');
    }

    public function edit(DropoutRepeater $dropoutRepeater)
    {
        abort(404);
    }

    public function update(Request $request, DropoutRepeater $dropoutRepeater)
    {
        $data = $request->validate([
            'school_year_id' => 'required|exists:school_years,id',
            'grade_level' => 'required|string',
            'dropouts' => 'required|integer|min:0',
            'repeaters' => 'required|integer|min:0',
            'total_students' => 'required|integer|min:0',
        ]);

        $dropoutRepeater->update($data);

        return $dropoutRepeater;
    }

    public function destroy(DropoutRepeater $dropoutRepeater)
    {
        $dropoutRepeater->delete();

        return response()->noContent();
    }
}
