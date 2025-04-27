<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\PublicClientController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Program Routes
Route::apiResource('programs', ProgramController::class);

// Client Routes
Route::apiResource('clients', ClientController::class);

// Enrollment Routes
Route::post('enrollments', [EnrollmentController::class, 'store']);

// Public Client Profile Route
Route::get('public/clients/{id}/profile', [PublicClientController::class, 'profile']);