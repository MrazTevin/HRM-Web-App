<?php

namespace App\Services;

use App\Repositories\ClientRepository;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ClientService
{
    protected $clientRepository;

    public function __construct(ClientRepository $clientRepository)
    {
        $this->clientRepository = $clientRepository;
    }

    public function getAllClients()
    {
        return $this->clientRepository->all();
    }

    public function createClient(array $data)
    {
        $validator = Validator::make($data, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'contact_info' => 'nullable|string',
            'metadata.admission_date' => 'nullable|date',
            'metadata.department' => 'nullable|string',
            'metadata.diagnosis' => 'nullable|string',
            'metadata.status' => 'nullable|in:INPATIENT,OUTPATIENT',
            'metadata.contact' => 'nullable|string',
            'metadata.email' => 'nullable|email',
            'metadata.address' => 'nullable|string',
            'metadata.insurance_provider' => 'nullable|string',
            'metadata.insurance_number' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return $this->clientRepository->create($data);
    }

    public function getClientById($id)
    {
        return $this->clientRepository->find($id);
    }

    public function updateClient($id, array $data)
    {
        $validator = Validator::make($data, [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'dob' => 'sometimes|date',
            'gender' => 'sometimes|in:male,female,other',
            'contact_info' => 'nullable|string',
            'metadata.admission_date' => 'nullable|date',
            'metadata.department' => 'nullable|string',
            'metadata.diagnosis' => 'nullable|string',
            'metadata.status' => 'nullable|in:INPATIENT,OUTPATIENT',
            'metadata.contact' => 'nullable|string',
            'metadata.email' => 'nullable|email',
            'metadata.address' => 'nullable|string',
            'metadata.insurance_provider' => 'nullable|string',
            'metadata.insurance_number' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return $this->clientRepository->update($id, $data);
    }

    public function deleteClient($id)
    {
        return $this->clientRepository->delete($id);
    }
    
    public function searchClients($query)
    {
        return $this->clientRepository->search($query);
    }
    
    public function enrollClientInPrograms($clientId, array $programIds)
    {
        $validator = Validator::make(['client_id' => $clientId, 'program_ids' => $programIds], [
            'client_id' => 'required|string|exists:clients,id',
            'program_ids' => 'required|array',
            'program_ids.*' => 'exists:programs,id',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }
        
        return $this->clientRepository->enrollInPrograms($clientId, $programIds);
    }
    
    public function getPublicClientProfile($id)
    {
        return $this->clientRepository->getPublicProfile($id);
    }
}