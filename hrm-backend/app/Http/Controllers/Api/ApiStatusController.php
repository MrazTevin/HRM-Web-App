<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiStatusController extends Controller
{
    public function getStatus(Request $request)
    {
        return response()->json([
            'message' => '✅ HRM API is working perfectly!',
        ]);
    }
}