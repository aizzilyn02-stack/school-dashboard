<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;

class BuildingController extends Controller
{
    public function index()
    {
        return Building::with(['rooms', 'classrooms'])->get();
    }

    public function create()
    {
        abort(404);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'building_name' => 'required|string',
            'total_rooms' => 'required|integer|min:0',
            'condition' => 'required|string',
            'year_built' => 'nullable|integer|min:0',
            'last_renovation' => 'nullable|string',
        ]);

        return Building::create($data);
    }

    public function show(Building $building)
    {
        return $building->load(['rooms', 'classrooms']);
    }

    public function edit(Building $building)
    {
        abort(404);
    }

    public function update(Request $request, Building $building)
    {
        $data = $request->validate([
            'building_name' => 'required|string',
            'total_rooms' => 'required|integer|min:0',
            'condition' => 'required|string',
            'year_built' => 'nullable|integer|min:0',
            'last_renovation' => 'nullable|string',
        ]);

        $building->update($data);

        return $building;
    }

    public function destroy(Building $building)
    {
        $building->delete();

        return response()->noContent();
    }
}
