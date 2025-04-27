<?php

namespace App\Repositories;

use App\Models\Client;
use App\Models\ClientMetadata;
use App\Repositories\Interfaces\RepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ClientRepository implements RepositoryInterface
{
    protected $model;
    protected $metadataModel;

    public function __construct(Client $client, ClientMetadata $clientMetadata)
    {
        $this->model = $client;
        $this->metadataModel = $clientMetadata;
    }

    public function all()
    {
        return $this->model->with('metadata')->get();
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $client = $this->model->create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'dob' => $data['dob'],
                'gender' => $data['gender'],
                'contact_info' => $data['contact_info'] ?? '',
            ]);

            if (isset($data['metadata'])) {
                $client->metadata()->create($data['metadata']);
            }
            
            DB::commit();
            return $client->load('metadata');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function find($id)
    {
        return $this->model->with(['metadata', 'programs.metadata'])->findOrFail($id);
    }

    public function update($id, array $data)
    {
        DB::beginTransaction();
        try {
            $client = $this->model->findOrFail($id);
            
            if (isset($data['first_name'])) $client->first_name = $data['first_name'];
            if (isset($data['last_name'])) $client->last_name = $data['last_name'];
            if (isset($data['dob'])) $client->dob = $data['dob'];
            if (isset($data['gender'])) $client->gender = $data['gender'];
            if (isset($data['contact_info'])) $client->contact_info = $data['contact_info'];
            
            $client->save();

            if (isset($data['metadata'])) {
                $client->metadata()->updateOrCreate(
                    ['client_id' => $client->id],
                    $data['metadata']
                );
            }
            
            DB::commit();
            return $client->load('metadata');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
    
    public function search(string $query)
    {
        return $this->model->where('first_name', 'like', "%{$query}%")
            ->orWhere('last_name', 'like', "%{$query}%")
            ->orWhereHas('metadata', function ($q) use ($query) {
                $q->where('diagnosis', 'like', "%{$query}%")
                  ->orWhere('department', 'like', "%{$query}%");
            })
            ->with('metadata')
            ->get();
    }
    
    public function enrollInPrograms($clientId, array $programIds)
    {
        $client = $this->model->findOrFail($clientId);
        $now = now();
        
        $syncData = [];
        foreach ($programIds as $programId) {
            $syncData[$programId] = ['enrolled_at' => $now];
        }
        
        return $client->programs()->syncWithoutDetaching($syncData);
    }
    
    public function getPublicProfile($id)
    {
        return $this->model->select([
            'id', 'first_name', 'last_name'
        ])->with(['programs' => function($query) {
            $query->select(['programs.id', 'name']);
        }])->findOrFail($id);
    }
}