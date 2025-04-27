<?php

namespace App\Services;

use App\Repositories\ProgramRepository;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ProgramService
{
    protected $programRepository;

    public function __construct(ProgramRepository $programRepository)
    {
        $this->programRepository = $programRepository;
    }

    public function getAllPrograms()
    {
        return $this->programRepository->all();
    }

    public function createProgram(array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'metadata.duration' => 'nullable|integer',
            'metadata.department' => 'nullable|string',
            'metadata.max_capacity' => 'nullable|integer',
            'metadata.current_enrollment' => 'nullable|integer',
            'metadata.start_date' => 'nullable|date',
            'metadata.end_date' => 'nullable|date|after_or_equal:metadata.start_date',
            'metadata.status' => 'nullable|in:ACTIVE,COMPLETED,UPCOMING',
            'metadata.cost' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return $this->programRepository->create($data);
    }

    public function getProgramById($id)
    {
        return $this->programRepository->find($id);
    }

    public function updateProgram($id, array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'metadata.duration' => 'nullable|integer',
            'metadata.department' => 'nullable|string',
            'metadata.max_capacity' => 'nullable|integer',
            'metadata.current_enrollment' => 'nullable|integer',
            'metadata.start_date' => 'nullable|date',
            'metadata.end_date' => 'nullable|date|after_or_equal:metadata.start_date',
            'metadata.status' => 'nullable|in:ACTIVE,COMPLETED,UPCOMING',
            'metadata.cost' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return $this->programRepository->update($id, $data);
    }

    public function deleteProgram($id)
    {
        return $this->programRepository->delete($id);
    }
    
    public function updateEnrollmentCount($id)
    {
        return $this->programRepository->updateEnrollmentCount($id);
    }
}