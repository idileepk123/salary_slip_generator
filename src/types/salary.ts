export type SlipMode = "employee" | "student";
export type StudentType = "day-scholar" | "hosteler";

export interface SalaryComponent {
  id: string;
  name: string;
  amount: number;
  description: string;
}

export interface EmployeeDetails {
  name: string;
  employeeId: string;
  occupation: string;
  companyName: string;
  month: string;
  year: string;
}

export interface StudentDetails {
  name: string;
  studentId: string;
  course: string;
  collegeName: string;
  studentType: StudentType;
  semester: string;
  year: string;
}

export interface SalaryData {
  mode: SlipMode;
  employee: EmployeeDetails;
  student: StudentDetails;
  earnings: SalaryComponent[];
  deductions: SalaryComponent[];
  fees: SalaryComponent[];
}

export const EMPLOYEE_EARNINGS = [
  { name: "Basic Pay", description: "Base salary before any allowances or deductions" },
  { name: "HRA", description: "House Rent Allowance – Allowance for accommodation expenses" },
  { name: "DA", description: "Dearness Allowance – Compensates for inflation and cost of living" },
  { name: "TA", description: "Travel Allowance – Covers commuting and travel expenses" },
  { name: "Medical", description: "Medical Allowance – Covers healthcare and medical expenses" },
  { name: "Special Allowance", description: "Additional allowance as per company policy" },
];

export const EMPLOYEE_DEDUCTIONS = [
  { name: "PF", description: "Provident Fund – Retirement savings contribution" },
  { name: "ESI", description: "Employee State Insurance – Health insurance scheme" },
  { name: "Professional Tax", description: "State-level tax on employment income" },
  { name: "TDS", description: "Tax Deducted at Source – Income tax deducted by employer" },
  { name: "Income Tax", description: "Direct tax on total income as per IT slab" },
];

export const STUDENT_FEES_COMMON = [
  { name: "Tuition Fees", description: "Core academic instruction charges" },
  { name: "Exam Fees", description: "Charges for semester/annual examinations" },
  { name: "Bus Fees", description: "Transport facility charges for college commute" },
  { name: "Attendance Due", description: "Penalty or dues related to attendance shortfall" },
];

export const STUDENT_FEES_HOSTELER = [
  { name: "Hostel Fees", description: "Accommodation charges for hostel residents" },
  { name: "Mess Fees", description: "Food and dining facility charges" },
];

export const CHART_COLORS = [
  'hsl(220, 60%, 22%)',
  'hsl(45, 70%, 55%)',
  'hsl(160, 50%, 45%)',
  'hsl(340, 60%, 55%)',
  'hsl(280, 45%, 50%)',
  'hsl(200, 55%, 50%)',
  'hsl(30, 65%, 50%)',
  'hsl(100, 45%, 45%)',
];
