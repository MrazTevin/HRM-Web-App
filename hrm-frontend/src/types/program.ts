export interface ProgramMetadata {
  id?: string
  program_id?: string
  duration: number
  department: string
  max_capacity: number
  current_enrollment: number
  status: "ACTIVE" | "UPCOMING" | "COMPLETED"
  cost: number
  created_at?: string
  updated_at?: string
}

export interface Program {
  id: string
  name: string
  description: string
  created_at?: string
  updated_at?: string
  metadata: ProgramMetadata
  pivot ?: {
    client_id: string
    program_id: string
    enrolled_at: string
    created_at : string
    updated_at : string
  }
  
}

export interface ProgramCreateRequest {
  name: string
  description: string
  metadata: {
    duration: number
    department: string
    max_capacity: number
    current_enrollment: number
    start_date: string
    end_date: string
    status: "ACTIVE" | "UPCOMING" | "COMPLETED"
    cost: number
  }
}

// Add new interface for update requests
export interface ProgramUpdateRequest {
  name?: string
  description?: string
  metadata?: Partial<ProgramMetadata>
}