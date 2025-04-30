import { Program } from "./program"

export interface ClientMetadata {
  id?: string
  client_id?: string
  admission_date: string
  department: string
  diagnosis: string
  status: "INPATIENT" | "OUTPATIENT"
  contact: string
  email: string
  address: string
  insurance_provider?: string
  insurance_number?: string
  created_at?: string
  updated_at?: string
}

export interface Client {
  id: string
  first_name: string
  last_name: string
  dob: string
  gender: string
  contact_info: string
  created_at?: string
  updated_at?: string
  metadata: ClientMetadata
  programs?: Program[]
}


export interface ClientCreateRequest {
  first_name: string
  last_name: string
  dob: string
  gender: string
  contact_info: string
  metadata: {
    admission_date: string
    department: string
    diagnosis: string
    status: string
    contact: string
    email: string
    address: string
    insurance_provider?: string
    insurance_number?: string
  }
}