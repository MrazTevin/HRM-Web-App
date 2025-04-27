<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Client extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'first_name',
        'last_name',
        'dob',
        'gender',
        'contact_info'
    ];

    protected $casts = [
        'dob' => 'date',
    ];

    /**
     * Get the programs that the client is enrolled in.
     */
    public function programs(): BelongsToMany
    {
        return $this->belongsToMany(Program::class)
            ->withPivot('enrolled_at')
            ->withTimestamps();
    }

    /**
     * Get the client's metadata.
     */
    public function metadata(): HasOne
    {
        return $this->hasOne(ClientMetadata::class);
    }
    
    /**
     * Get the client's full name.
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
    
    /**
     * Calculate age based on date of birth.
     */
    public function getAgeAttribute(): int
    {
        return $this->dob->age;
    }
}