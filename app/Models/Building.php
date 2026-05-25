<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Building extends Model
{
    protected $fillable = [
        'building_name',
        'total_rooms',
        'condition',
        'year_built',
        'last_renovation',
    ];

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    public function classrooms(): HasMany
    {
        return $this->hasMany(Classroom::class);
    }
}
