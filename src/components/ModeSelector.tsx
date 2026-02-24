import { SlipMode } from "@/types/salary";
import { Briefcase, GraduationCap } from "lucide-react";

interface ModeSelectorProps {
  onSelect: (mode: SlipMode) => void;
}

const ModeSelector = ({ onSelect }: ModeSelectorProps) => {
  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-10">
      <h2 className="text-xl font-heading font-bold text-foreground mb-2 text-center">
        What would you like to generate?
      </h2>
      <p className="text-muted-foreground text-center mb-8 font-body">
        Choose your slip type to get started
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
        <button
          onClick={() => onSelect("employee")}
          className="group flex flex-col items-center gap-4 p-8 rounded-xl border-2 border-border bg-muted/30 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-foreground text-lg">Salary Slip</p>
            <p className="text-muted-foreground text-sm mt-1">For employees to generate payslips</p>
          </div>
        </button>

        <button
          onClick={() => onSelect("student")}
          className="group flex flex-col items-center gap-4 p-8 rounded-xl border-2 border-border bg-muted/30 hover:border-accent hover:bg-accent/5 transition-all duration-200 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <GraduationCap className="w-8 h-8 text-accent" />
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-foreground text-lg">Fees Slip</p>
            <p className="text-muted-foreground text-sm mt-1">For students to calculate college fees</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
