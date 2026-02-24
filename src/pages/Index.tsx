import { useState } from "react";
import {
  SlipMode, SalaryData, EmployeeDetails, StudentDetails, SalaryComponent,
  EMPLOYEE_EARNINGS, EMPLOYEE_DEDUCTIONS,
  STUDENT_FEES_COMMON, STUDENT_FEES_HOSTELER,
} from "@/types/salary";
import StepIndicator from "@/components/StepIndicator";
import ModeSelector from "@/components/ModeSelector";
import EmployeeForm from "@/components/EmployeeForm";
import StudentForm from "@/components/StudentForm";
import ComponentsForm from "@/components/ComponentsForm";
import SalarySlipView from "@/components/SalarySlipView";

const makeComponents = (templates: { name: string; description: string }[]): SalaryComponent[] =>
  templates.map((t) => ({ id: crypto.randomUUID(), name: t.name, amount: 0, description: t.description }));

const EMPLOYEE_STEPS = ["Employee Details", "Salary Components", "Salary Slip"];
const STUDENT_STEPS = ["Student Details", "Fee Components", "Fees Slip"];

const Index = () => {
  const [mode, setMode] = useState<SlipMode | null>(null);
  const [step, setStep] = useState(1);

  const [employee, setEmployee] = useState<EmployeeDetails>({
    name: "", employeeId: "", occupation: "", companyName: "", month: "", year: new Date().getFullYear().toString(),
  });

  const [student, setStudent] = useState<StudentDetails>({
    name: "", studentId: "", course: "", collegeName: "", studentType: "day-scholar", semester: "", year: new Date().getFullYear().toString(),
  });

  const [earnings, setEarnings] = useState<SalaryComponent[]>([]);
  const [deductions, setDeductions] = useState<SalaryComponent[]>([]);
  const [fees, setFees] = useState<SalaryComponent[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleModeSelect = (m: SlipMode) => {
    setMode(m);
    setStep(1);
    if (m === "employee") {
      setEarnings(makeComponents(EMPLOYEE_EARNINGS));
      setDeductions(makeComponents(EMPLOYEE_DEDUCTIONS));
    } else {
      // fees will be set after student type is confirmed in step 1
      setFees([]);
    }
  };

  const buildStudentFees = (type: string) => {
    const templates = type === "hosteler"
      ? [...STUDENT_FEES_COMMON, ...STUDENT_FEES_HOSTELER]
      : [...STUDENT_FEES_COMMON];
    return makeComponents(templates);
  };

  const validateEmployee = (): boolean => {
    const errs: string[] = [];
    if (!employee.name.trim()) errs.push("Employee name is required");
    if (!employee.employeeId.trim()) errs.push("Employee ID is required");
    if (!employee.occupation.trim()) errs.push("Occupation is mandatory");
    if (!employee.companyName.trim()) errs.push("Company name is required");
    if (!employee.month) errs.push("Month is required");
    if (!employee.year.trim()) errs.push("Year is required");
    setErrors(errs);
    return errs.length === 0;
  };

  const validateStudent = (): boolean => {
    const errs: string[] = [];
    if (!student.name.trim()) errs.push("Student name is required");
    if (!student.studentId.trim()) errs.push("Student / Roll No is required");
    if (!student.course.trim()) errs.push("Course is required");
    if (!student.collegeName.trim()) errs.push("College name is required");
    if (!student.semester) errs.push("Semester is required");
    if (!student.year.trim()) errs.push("Year is required");
    setErrors(errs);
    return errs.length === 0;
  };

  const validateComponents = (): boolean => {
    const errs: string[] = [];
    if (mode === "employee") {
      const filledEarnings = earnings.filter((e) => e.amount > 0);
      if (filledEarnings.length === 0) errs.push("At least one earning amount is required");
      const totalE = earnings.reduce((s, e) => s + e.amount, 0);
      const totalD = deductions.reduce((s, d) => s + d.amount, 0);
      if (totalD > totalE) errs.push("Total deductions cannot exceed total earnings");
    } else {
      const filledFees = fees.filter((f) => f.amount > 0);
      if (filledFees.length === 0) errs.push("At least one fee amount is required");
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      const valid = mode === "employee" ? validateEmployee() : validateStudent();
      if (valid) {
        if (mode === "student") {
          setFees(buildStudentFees(student.studentType));
        }
        setStep(2);
        setErrors([]);
      }
    } else if (step === 2 && validateComponents()) {
      setStep(3);
      setErrors([]);
    }
  };

  const handleBack = () => {
    setErrors([]);
    if (step === 1) {
      setMode(null);
    } else {
      setStep((s) => Math.max(1, s - 1));
    }
  };

  const handleReset = () => {
    setMode(null);
    setStep(1);
    setEmployee({ name: "", employeeId: "", occupation: "", companyName: "", month: "", year: new Date().getFullYear().toString() });
    setStudent({ name: "", studentId: "", course: "", collegeName: "", studentType: "day-scholar", semester: "", year: new Date().getFullYear().toString() });
    setEarnings([]);
    setDeductions([]);
    setFees([]);
    setErrors([]);
  };

  const salaryData: SalaryData = { mode: mode || "employee", employee, student, earnings, deductions, fees };
  const steps = mode === "student" ? STUDENT_STEPS : EMPLOYEE_STEPS;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight">
            Salary & Fees Slip Generator
          </h1>
          <p className="text-muted-foreground mt-2 font-body">
            Generate professional salary slips or student fees slips
          </p>
        </header>

        {mode && (
          <div className="no-print mb-8">
            <StepIndicator currentStep={step} steps={steps} />
          </div>
        )}

        {errors.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 animate-fade-in">
            {errors.map((err, i) => (
              <p key={i} className="text-destructive text-sm">{err}</p>
            ))}
          </div>
        )}

        <div className="animate-fade-in">
          {!mode && <ModeSelector onSelect={handleModeSelect} />}

          {mode === "employee" && step === 1 && (
            <EmployeeForm employee={employee} onChange={setEmployee} onNext={handleNext} />
          )}
          {mode === "student" && step === 1 && (
            <StudentForm student={student} onChange={setStudent} onNext={handleNext} />
          )}

          {mode && step === 2 && mode === "employee" && (
            <ComponentsForm
              title="Salary Components"
              sections={[
                { title: "Earnings", items: earnings, onChange: setEarnings, accentClass: "text-success" },
                { title: "Deductions", items: deductions, onChange: setDeductions, accentClass: "text-destructive" },
              ]}
              onNext={handleNext}
              onBack={handleBack}
              nextLabel="Generate Slip"
            />
          )}
          {mode && step === 2 && mode === "student" && (
            <ComponentsForm
              title="Fee Components"
              sections={[
                { title: "Fees", items: fees, onChange: setFees, accentClass: "text-success" },
              ]}
              onNext={handleNext}
              onBack={handleBack}
              nextLabel="Generate Fees Slip"
            />
          )}

          {mode && step === 3 && (
            <SalarySlipView data={salaryData} onBack={handleBack} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
