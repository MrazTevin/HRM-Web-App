<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ClientService;
use Illuminate\Http\JsonResponse;
use Exception;

class PublicClientController extends Controller
{
    protected $clientService;

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    /**
     * Display the public profile of a client.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile(string $id): JsonResponse
    {
        try {
            $client = $this->clientService->getPublicClientProfile($id);
            return response()->json([
                'success' => true,
                'data' => $client
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Client not found'
            ], 404);
        }
    }
}