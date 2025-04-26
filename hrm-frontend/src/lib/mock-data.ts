// import { getRandomInt } from "./utils"

export type Client = {
  id: string
  name: string
  age: number
  gender: "Male" | "Female" | "Other"
  admissionDate: string
  department: string
  diagnosis: string
  status: "INPATIENT" | "OUTPATIENT"
  contact: string
  email: string
  address: string
  insuranceProvider?: string
  insuranceNumber?: string
  enrolledPrograms: string[]
}

export type Program = {
  id: string
  name: string
  description: string
  duration: string
  department: string
  maxCapacity: number
  currentEnrollment: number
  startDate: string
  endDate: string
  status: "ACTIVE" | "COMPLETED" | "UPCOMING"
  cost: number
}

export type DashboardStats = {
  clientCount: number
  clientChange: string
  programCount: number
  programChange: string
  complianceRate: number
  complianceChange: string
  revenueTotal: number
  revenueChange: string
  costTotal: number
  pendingTasks: number
  newRecords: number
}

// Mock clients data
export const mockClients: Client[] = [
  {
    id: "000234",
    name: "John Smith",
    age: 45,
    gender: "Male",
    admissionDate: "2024-08-20",
    department: "Cardiology",
    diagnosis: "Coronary Artery Disease",
    status: "INPATIENT",
    contact: "(555) 123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, Anytown, CA 12345",
    insuranceProvider: "Blue Cross",
    insuranceNumber: "BC12345678",
    enrolledPrograms: ["Cardiac Rehabilitation", "Nutrition Counseling"],
  },
  {
    id: "000235",
    name: "Maria Hernandez",
    age: 32,
    gender: "Female",
    admissionDate: "2024-08-22",
    department: "General Surgery",
    diagnosis: "Appendicitis",
    status: "OUTPATIENT",
    contact: "(555) 234-5678",
    email: "maria.h@example.com",
    address: "456 Oak Ave, Somewhere, CA 12346",
    insuranceProvider: "Aetna",
    insuranceNumber: "AE87654321",
    enrolledPrograms: ["Post-Surgery Recovery"],
  },
  {
    id: "000236",
    name: "James Johnson",
    age: 65,
    gender: "Male",
    admissionDate: "2024-08-22",
    department: "Oncology",
    diagnosis: "Lung Cancer",
    status: "INPATIENT",
    contact: "(555) 345-6789",
    email: "james.j@example.com",
    address: "789 Pine St, Nowhere, CA 12347",
    insuranceProvider: "Medicare",
    insuranceNumber: "MC98765432",
    enrolledPrograms: ["Chemotherapy", "Pain Management", "Respiratory Therapy"],
  },
  {
    id: "000237",
    name: "Sarah Williams",
    age: 28,
    gender: "Female",
    admissionDate: "2024-08-23",
    department: "Obstetrics",
    diagnosis: "Pregnancy",
    status: "OUTPATIENT",
    contact: "(555) 456-7890",
    email: "sarah.w@example.com",
    address: "101 Maple Dr, Anytown, CA 12348",
    insuranceProvider: "United Healthcare",
    insuranceNumber: "UH12378945",
    enrolledPrograms: ["Prenatal Care", "Nutrition Counseling"],
  },
  {
    id: "000238",
    name: "Robert Brown",
    age: 52,
    gender: "Male",
    admissionDate: "2024-08-24",
    department: "Neurology",
    diagnosis: "Parkinson's Disease",
    status: "INPATIENT",
    contact: "(555) 567-8901",
    email: "robert.b@example.com",
    address: "202 Cedar Ln, Somewhere, CA 12349",
    insuranceProvider: "Cigna",
    insuranceNumber: "CI45678901",
    enrolledPrograms: ["Movement Therapy", "Medication Management"],
  },
]

// Mock programs data
export const mockPrograms: Program[] = [
  {
    id: "P001",
    name: "Cardiac Rehabilitation",
    description: "Comprehensive program for heart disease patients",
    duration: "12 weeks",
    department: "Cardiology",
    maxCapacity: 30,
    currentEnrollment: 24,
    startDate: "2024-07-01",
    endDate: "2024-09-23",
    status: "ACTIVE",
    cost: 2500,
  },
  {
    id: "P002",
    name: "Nutrition Counseling",
    description: "Dietary guidance for various health conditions",
    duration: "8 weeks",
    department: "Nutrition",
    maxCapacity: 50,
    currentEnrollment: 42,
    startDate: "2024-08-15",
    endDate: "2024-10-10",
    status: "ACTIVE",
    cost: 1200,
  },
  {
    id: "P003",
    name: "Post-Surgery Recovery",
    description: "Rehabilitation program for post-surgical patients",
    duration: "6 weeks",
    department: "Physical Therapy",
    maxCapacity: 25,
    currentEnrollment: 18,
    startDate: "2024-08-01",
    endDate: "2024-09-12",
    status: "ACTIVE",
    cost: 1800,
  },
  {
    id: "P004",
    name: "Chemotherapy",
    description: "Cancer treatment program",
    duration: "16 weeks",
    department: "Oncology",
    maxCapacity: 20,
    currentEnrollment: 15,
    startDate: "2024-06-15",
    endDate: "2024-10-05",
    status: "ACTIVE",
    cost: 8500,
  },
  {
    id: "P005",
    name: "Pain Management",
    description: "Chronic pain management program",
    duration: "10 weeks",
    department: "Pain Clinic",
    maxCapacity: 35,
    currentEnrollment: 28,
    startDate: "2024-07-20",
    endDate: "2024-09-28",
    status: "ACTIVE",
    cost: 1600,
  },
  {
    id: "P006",
    name: "Respiratory Therapy",
    description: "Program for patients with respiratory conditions",
    duration: "8 weeks",
    department: "Pulmonology",
    maxCapacity: 25,
    currentEnrollment: 20,
    startDate: "2024-08-10",
    endDate: "2024-10-05",
    status: "ACTIVE",
    cost: 2200,
  },
  {
    id: "P007",
    name: "Prenatal Care",
    description: "Comprehensive care for pregnant women",
    duration: "40 weeks",
    department: "Obstetrics",
    maxCapacity: 40,
    currentEnrollment: 35,
    startDate: "2024-01-15",
    endDate: "2024-10-22",
    status: "ACTIVE",
    cost: 3500,
  },
  {
    id: "P008",
    name: "Movement Therapy",
    description: "Therapy for patients with movement disorders",
    duration: "12 weeks",
    department: "Neurology",
    maxCapacity: 20,
    currentEnrollment: 15,
    startDate: "2024-07-05",
    endDate: "2024-09-27",
    status: "ACTIVE",
    cost: 2800,
  },
  {
    id: "P009",
    name: "Medication Management",
    description: "Program to optimize medication regimens",
    duration: "4 weeks",
    department: "Pharmacy",
    maxCapacity: 60,
    currentEnrollment: 45,
    startDate: "2024-08-20",
    endDate: "2024-09-17",
    status: "UPCOMING",
    cost: 900,
  },
]

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  clientCount: 365,
  clientChange: "+12% increase on last month",
  programCount: 9,
  programChange: "+2 new programs",
  complianceRate: 98,
  complianceChange: "+5.5% increase on last month",
  revenueTotal: 58980,
  revenueChange: "+20% increase on last month",
  costTotal: 37470,
  pendingTasks: 2,
  newRecords: 5,
}


