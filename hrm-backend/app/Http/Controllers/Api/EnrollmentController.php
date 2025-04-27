<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ClientService;
use App\Services\ProgramService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;

class EnrollmentController extends Controller
{
    protected $clientService;
    protected $programService;

    public function __construct(ClientService $clientService, ProgramService $programService)
    {
        $this->clientService = $clientService;
        $this->programService = $programService;
    }

    /**
     * Enroll a client in one or more programs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'client_id' => 'required|string|exists:clients,id',
                'program_ids' => 'required|array',
                'program_ids.*' => 'exists:programs,id',
            ]);

            $clientId = $request->input('client_id');
            $programIds = $request->input('program_ids');
            
            $result = $this->clientService->enrollClientInPrograms($clientId, $programIds);
            
            // Update enrollment counts for each program
            foreach ($programIds as $programId) {
                $this->programService->updateEnrollmentCount($programId);
            }
            
            return response()->json([
                'success' => true,
                'data' => $result,
                'message' => 'Client enrolled in program(s) successfully'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }
}