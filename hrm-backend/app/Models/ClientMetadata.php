<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientMetadata extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'client_id',
        'admission_date',
        'department',
        'diagnosis',
        'status',
        'contact',
        'email',
        'address',
        'insurance_provider',
        'insurance_number'
    ];

    protected $casts = [
        'admission_date' => 'date',
    ];

    /**
     * Get the client that owns the metadata.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}