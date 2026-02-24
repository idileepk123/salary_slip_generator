import { SalaryData } from "@/types/salary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Printer } from "lucide-react";
import SalaryCharts from "@/components/SalaryCharts";
import TooltipCell from "@/components/TooltipCell";

interface SalarySlipViewProps {
  data: SalaryData;
  onBack: () => void;
  onReset: () => void;
}

const formatCurrency = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

const SalarySlipView = ({ data, onBack, onReset }: SalarySlipViewProps) => {
  const isStudent = data.mode === "student";
  const { employee, student, earnings, deductions, fees } = data;

  const items = isStudent ? fees.filter((f) => f.amount > 0) : earnings;
  const deductionItems = isStudent ? [] : deductions;

  const totalEarnings = isStudent
    ? items.reduce((s, e) => s + e.amount, 0)
    : earnings.reduce((s, e) => s + e.amount, 0);
  const totalDeductions = deductionItems.reduce((s, d) => s + d.amount, 0);
  const netAmount = totalEarnings - totalDeductions;

  const name = isStudent ? student.name : employee.name;
  const companyOrCollege = isStudent ? student.collegeName : employee.companyName;
  const periodLabel = isStudent
    ? `Semester ${student.semester} – ${student.year}`
    : `${employee.month} ${employee.year}`;

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="no-print flex flex-wrap gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button variant="outline" onClick={() => window.print()} className="gap-2">
          <Printer className="w-4 h-4" /> Print
        </Button>
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RotateCcw className="w-4 h-4" /> New Slip
        </Button>
      </div>

      {/* Slip */}
      <div className="salary-slip-print">
        {/* Header */}
        <div className="text-center border-b border-border pb-5 mb-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            {companyOrCollege}
          </h2>
          <p className="text-muted-foreground font-body mt-1">
            {isStudent ? "Fees Slip" : "Salary Slip"} – {periodLabel}
          </p>
        </div>

        {/* Person Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/40 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Name</p>
            <p className="font-semibold text-foreground">{name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {isStudent ? "Roll No" : "Employee ID"}
            </p>
            <p className="font-semibold text-foreground">
              {isStudent ? student.studentId : employee.employeeId}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {isStudent ? "Course" : "Occupation"}
            </p>
            <p className="font-semibold text-foreground">
              {isStudent ? student.course : employee.occupation}
            </p>
          </div>
          {isStudent && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Type</p>
              <p className="font-semibold text-foreground capitalize">{student.studentType.replace("-", " ")}</p>
            </div>
          )}
        </div>

        {/* Tables */}
        <div className={`grid grid-cols-1 ${!isStudent ? "md:grid-cols-2" : ""} gap-6 mb-6`}>
          {/* Earnings / Fees */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-success uppercase tracking-wider mb-3">
              {isStudent ? "Fee Components" : "Earnings"}
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Component</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((e) => (
                  <tr key={e.id} className="border-b border-border/50">
                    <td className="py-2">
                      <TooltipCell name={e.name} description={e.description} />
                    </td>
                    <td className="text-right py-2 font-medium">{formatCurrency(e.amount)}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-2">{isStudent ? "Total Fees" : "Total Earnings"}</td>
                  <td className="text-right py-2">{formatCurrency(totalEarnings)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deductions (employee only) */}
          {!isStudent && (
            <div>
              <h3 className="text-sm font-heading font-semibold text-destructive uppercase tracking-wider mb-3">
                Deductions
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Component</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {deductions.map((d) => (
                    <tr key={d.id} className="border-b border-border/50">
                      <td className="py-2">
                        <TooltipCell name={d.name} description={d.description} />
                      </td>
                      <td className="text-right py-2 font-medium">{formatCurrency(d.amount)}</td>
                    </tr>
                  ))}
                  {deductions.length === 0 && (
                    <tr>
                      <td colSpan={2} className="py-4 text-center text-muted-foreground italic">No deductions</td>
                    </tr>
                  )}
                  <tr className="font-bold">
                    <td className="py-2">Total Deductions</td>
                    <td className="text-right py-2">{formatCurrency(totalDeductions)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Net Amount */}
        <div className="bg-primary rounded-lg p-5 text-center">
          <p className="text-primary-foreground/80 text-sm uppercase tracking-wider font-heading">
            {isStudent ? "Total Fees Payable" : "Net Salary"}
          </p>
          <p className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mt-1">
            {formatCurrency(netAmount)}
          </p>
        </div>
      </div>

      {/* Charts */}
      {items.length > 0 && (
        <div className="no-print">
          <SalaryCharts
            earnings={items}
            deductions={deductionItems}
            earningsLabel={isStudent ? "Fees Distribution" : "Earnings Distribution"}
            deductionsLabel="Deductions Distribution"
            title={isStudent ? "Fees Breakdown" : "Salary Breakdown"}
          />
        </div>
      )}
    </div>
  );
};

export default SalarySlipView;
