<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProgramService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;

class ProgramController extends Controller
{
    protected $programService;

    public function __construct(ProgramService $programService)
    {
        $this->programService = $programService;
    }

    /**
     * Display a listing of programs.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $programs = $this->programService->getAllPrograms();
            return response()->json([
                'success' => true,
                'data' => $programs
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created program.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $program = $this->programService->createProgram($request->all());
            return response()->json([
                'success' => true,
                'data' => $program,
                'message' => 'Program created successfully'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Display the specified program.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $program = $this->programService->getProgramById($id);
            return response()->json([
                'success' => true,
                'data' => $program
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Program not found'
            ], 404);
        }
    }

    /**
     * Update the specified program.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $program = $this->programService->updateProgram($id, $request->all());
            return response()->json([
                'success' => true,
                'data' => $program,
                'message' => 'Program updated successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], $e->getCode() == 404 ? 404 : 422);
        }
    }

    /**
     * Remove the specified program.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $this->programService->deleteProgram($id);
            return response()->json([
                'success' => true,
                'message' => 'Program deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 404);
        }
    }
}