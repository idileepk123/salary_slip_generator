import { SalaryComponent, CHART_COLORS } from "@/types/salary";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface SalaryChartsProps {
  earnings: SalaryComponent[];
  deductions: SalaryComponent[];
  earningsLabel?: string;
  deductionsLabel?: string;
  title?: string;
}

const renderChart = (items: SalaryComponent[], title: string) => {
  if (items.length === 0) return null;
  const data = items.map((i) => ({ name: i.name, value: i.amount }));
  const total = items.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="flex-1 min-w-[280px]">
      <h3 className="text-center font-heading font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            label={({ name, value }) => `${name} (${((value / total) * 100).toFixed(1)}%)`}
            labelLine={true}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(220, 15%, 88%)",
              fontSize: "13px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const SalaryCharts = ({
  earnings,
  deductions,
  earningsLabel = "Earnings Distribution",
  deductionsLabel = "Deductions Distribution",
  title = "Salary Breakdown",
}: SalaryChartsProps) => {
  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6 text-center">
        {title}
      </h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {renderChart(earnings, earningsLabel)}
        {renderChart(deductions, deductionsLabel)}
      </div>
    </div>
  );
};

export default SalaryCharts;
