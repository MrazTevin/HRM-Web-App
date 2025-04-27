<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Program extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description'
    ];

    /**
     * Get the clients enrolled in this program.
     */
    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class)
            ->withPivot('enrolled_at')
            ->withTimestamps();
    }

    /**
     * Get the program's metadata.
     */
    public function metadata(): HasOne
    {
        return $this->hasOne(ProgramMetadata::class);
    }
    
    /**
     * Get the number of enrolled clients.
     */
    public function getEnrollmentCountAttribute(): int
    {
        return $this->clients()->count();
    }
}