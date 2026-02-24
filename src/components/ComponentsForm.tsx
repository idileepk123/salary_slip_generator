import { SalaryComponent } from "@/types/salary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ComponentsFormProps {
  title: string;
  sections: {
    title: string;
    items: SalaryComponent[];
    onChange: (items: SalaryComponent[]) => void;
    accentClass: string;
  }[];
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
}

const ComponentSection = ({
  title,
  items,
  onChange,
  accentClass,
}: {
  title: string;
  items: SalaryComponent[];
  onChange: (items: SalaryComponent[]) => void;
  accentClass: string;
}) => {
  const updateAmount = (id: string, value: number) => {
    onChange(items.map((i) => (i.id === id ? { ...i, amount: value } : i)));
  };

  return (
    <div>
      <h3 className={`text-lg font-heading font-semibold ${accentClass} mb-4`}>{title}</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-3 items-end p-3 bg-muted/50 rounded-lg">
            <div className="col-span-12 md:col-span-5 space-y-1">
              <Label className="text-xs text-muted-foreground">{item.name}</Label>
              <p className="text-xs text-muted-foreground/70 italic">{item.description}</p>
            </div>
            <div className="col-span-12 md:col-span-7 space-y-1">
              <Label className="text-xs">Amount (₹)</Label>
              <Input
                type="number"
                min={0}
                placeholder="0"
                value={item.amount || ""}
                onChange={(e) => updateAmount(item.id, Number(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComponentsForm = ({ title, sections, onNext, onBack, nextLabel = "Generate Slip" }: ComponentsFormProps) => {
  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8 space-y-8">
      <h2 className="text-xl font-heading font-bold text-foreground">{title}</h2>

      {sections.map((section, idx) => (
        <div key={section.title}>
          {idx > 0 && <div className="border-t border-border mb-8" />}
          <ComponentSection {...section} />
        </div>
      ))}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button onClick={onNext} className="gap-2">
          {nextLabel} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ComponentsForm;
