import { EmployeeDetails } from "@/types/salary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface EmployeeFormProps {
  employee: EmployeeDetails;
  onChange: (e: EmployeeDetails) => void;
  onNext: () => void;
}

const EmployeeForm = ({ employee, onChange, onNext }: EmployeeFormProps) => {
  const update = (field: keyof EmployeeDetails, value: string) => {
    onChange({ ...employee, [field]: value });
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6">
        Employee Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" placeholder="e.g. Infosys Ltd." value={employee.companyName} onChange={(e) => update("companyName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Employee Name</Label>
          <Input id="name" placeholder="e.g. Rahul Sharma" value={employee.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeId">Employee ID</Label>
          <Input id="employeeId" placeholder="e.g. EMP-1024" value={employee.employeeId} onChange={(e) => update("employeeId", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation <span className="text-destructive">*</span></Label>
          <Input id="occupation" placeholder="e.g. Software Engineer" value={employee.occupation} onChange={(e) => update("occupation", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Month</Label>
          <Select value={employee.month} onValueChange={(v) => update("month", v)}>
            <SelectTrigger><SelectValue placeholder="Select month" /></SelectTrigger>
            <SelectContent>
              {MONTHS.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input id="year" placeholder="2026" value={employee.year} onChange={(e) => update("year", e.target.value)} />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={onNext} className="gap-2">
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EmployeeForm;
