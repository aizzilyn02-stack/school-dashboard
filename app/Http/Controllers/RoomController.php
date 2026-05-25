<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        return Room::with('building')->get();
    }

    public function create()
    {
        abort(404);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'building_id' => 'required|exists:buildings,id',
            'room_number' => 'required|string',
            'room_type' => 'required|string',
            'length_m' => 'nullable|numeric|min:0',
            'width_m' => 'nullable|numeric|min:0',
            'area_sqm' => 'nullable|numeric|min:0',
            'condition' => 'required|string',
            'usage_category' => 'required|string',
        ]);

        return Room::create($data);
    }

    public function show(Room $room)
    {
        return $room->load('building');
    }

    public function edit(Room $room)
    {
        abort(404);
    }

    public function update(Request $request, Room $room)
    {
        $data = $request->validate([
            'building_id' => 'required|exists:buildings,id',
            'room_number' => 'required|string',
            'room_type' => 'required|string',
            'length_m' => 'nullable|numeric|min:0',
            'width_m' => 'nullable|numeric|min:0',
            'area_sqm' => 'nullable|numeric|min:0',
            'condition' => 'required|string',
            'usage_category' => 'required|string',
        ]);

        $room->update($data);

        return $room;
    }

    public function destroy(Room $room)
    {
        $room->delete();

        return response()->noContent();
    }
}
