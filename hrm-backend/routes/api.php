<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\PublicClientController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiStatusController;
use Illuminate\Support\Facades\DB;

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

Route::get('/status', [ApiStatusController::class, 'getStatus']);

Route::get('/db-test', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['message' => 'Database connection successful']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});