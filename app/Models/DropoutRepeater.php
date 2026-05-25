<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DropoutRepeater extends Model
{
    protected $fillable = [
        'school_year_id',
        'grade_level',
        'dropouts',
        'repeaters',
        'total_students',
    ];

    protected $appends = ['dropout_rate', 'repeater_rate'];

    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

    // Calculate rates on the fly (percentage with two decimal places)
    public function getDropoutRateAttribute(): float
    {
        $total = (int) $this->total_students;
        if ($total <= 0) {
            return 0.00;
        }

        $rate = ((int) $this->dropouts / $total) * 100;

        return round($rate, 2);
    }

    public function getRepeaterRateAttribute(): float
    {
        $total = (int) $this->total_students;
        if ($total <= 0) {
            return 0.00;
        }

        $rate = ((int) $this->repeaters / $total) * 100;

        return round($rate, 2);
    }
}
