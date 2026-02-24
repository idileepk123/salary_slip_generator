import { StudentDetails, StudentType } from "@/types/salary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";

interface StudentFormProps {
  student: StudentDetails;
  onChange: (s: StudentDetails) => void;
  onNext: () => void;
}

const StudentForm = ({ student, onChange, onNext }: StudentFormProps) => {
  const update = (field: keyof StudentDetails, value: string) => {
    onChange({ ...student, [field]: value });
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6">
        Student Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="collegeName">College / Institution Name <span className="text-destructive">*</span></Label>
          <Input id="collegeName" placeholder="e.g. ABC Engineering College" value={student.collegeName} onChange={(e) => update("collegeName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentName">Student Name <span className="text-destructive">*</span></Label>
          <Input id="studentName" placeholder="e.g. Priya Patel" value={student.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentId">Student / Roll No <span className="text-destructive">*</span></Label>
          <Input id="studentId" placeholder="e.g. STU-2024-101" value={student.studentId} onChange={(e) => update("studentId", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course <span className="text-destructive">*</span></Label>
          <Input id="course" placeholder="e.g. B.Tech CSE" value={student.course} onChange={(e) => update("course", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="semester">Semester</Label>
          <Select value={student.semester} onValueChange={(v) => update("semester", v)}>
            <SelectTrigger><SelectValue placeholder="Select semester" /></SelectTrigger>
            <SelectContent>
              {Array.from({ length: 8 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>Semester {i + 1}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentYear">Year</Label>
          <Input id="studentYear" placeholder="2026" value={student.year} onChange={(e) => update("year", e.target.value)} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Label className="text-base font-semibold">Student Type <span className="text-destructive">*</span></Label>
        <RadioGroup
          value={student.studentType}
          onValueChange={(v) => update("studentType", v as StudentType)}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="day-scholar" id="day-scholar" />
            <Label htmlFor="day-scholar" className="cursor-pointer">Day Scholar</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hosteler" id="hosteler" />
            <Label htmlFor="hosteler" className="cursor-pointer">Hosteler</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={onNext} className="gap-2">
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StudentForm;
