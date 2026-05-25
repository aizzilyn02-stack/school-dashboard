<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    protected $fillable = [
        'building_id',
        'room_number',
        'room_type',
        'length_m',
        'width_m',
        'area_sqm',
        'condition',
        'usage_category',
    ];

    public function building(): BelongsTo
    {
        return $this->belongsTo(Building::class);
    }
}
