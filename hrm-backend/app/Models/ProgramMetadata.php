<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramMetadata extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'program_id',
        'duration',
        'department',
        'max_capacity',
        'current_enrollment',
        'start_date',
        'end_date',
        'status',
        'cost'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'cost' => 'decimal:2'
    ];

    /**
     * Get the program that owns the metadata.
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}