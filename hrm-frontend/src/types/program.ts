export interface ProgramMetadata {
  id?: string
  program_id?: string
  duration: string | number
  department: string
  max_capacity: number
  current_enrollment: number
  status: "ACTIVE" | "UPCOMING" | "COMPLETED"
  cost: number | string
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
  duration: number | string
  department: string
  max_capacity: number
  current_enrollment: number
  start_date: string
  end_date: string
  status: string
  cost: number | string
}
}