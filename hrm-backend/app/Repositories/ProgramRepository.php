<?php

namespace App\Repositories;

use App\Models\Program;
use App\Models\ProgramMetadata;
use App\Repositories\Interfaces\RepositoryInterface;
use Illuminate\Support\Facades\DB;

class ProgramRepository implements RepositoryInterface
{
    protected $model;
    protected $metadataModel;

    public function __construct(Program $program, ProgramMetadata $programMetadata)
    {
        $this->model = $program;
        $this->metadataModel = $programMetadata;
    }

    public function all()
    {
        return $this->model->with('metadata')->get();
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $program = $this->model->create([
                'name' => $data['name'],
                'description' => $data['description'],
            ]);

            if (isset($data['metadata'])) {
                $program->metadata()->create($data['metadata']);
            }
            
            DB::commit();
            return $program->load('metadata');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function find($id)
    {
        return $this->model->with(['metadata', 'clients'])->findOrFail($id);
    }

    public function update($id, array $data)
    {
        DB::beginTransaction();
        try {
            $program = $this->model->findOrFail($id);
            
            if (isset($data['name'])) $program->name = $data['name'];
            if (isset($data['description'])) $program->description = $data['description'];
            
            $program->save();

            if (isset($data['metadata'])) {
                $program->metadata()->updateOrCreate(
                    ['program_id' => $program->id],
                    $data['metadata']
                );
            }
            
            DB::commit();
            return $program->load('metadata');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
    
    public function updateEnrollmentCount($id)
    {
        $program = $this->model->findOrFail($id);
        $count = $program->clients()->count();
        
        if ($program->metadata) {
            $program->metadata->update(['current_enrollment' => $count]);
        }
        
        return $count;
    }
}