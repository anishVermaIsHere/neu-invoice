"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";

type TotalInvoiceGraphPropsType = {
  total: number;
  status: string;
  fill: string;
}[];

const TotalInvoiceGraph = ({ data }: { data: TotalInvoiceGraphPropsType }) => {
  const totalInvoices = data.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <ChartContainer
      config={{
        paid: {
          label: "PAID",
          color: "hsl(var(--chart-1))",
        },
        due: {
          label: "DUE",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart data={data}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data}
            dataKey="total"
            nameKey="status"
            innerRadius={60}
            outerRadius={100}
            strokeWidth={2}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalInvoices}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Invoices
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TotalInvoiceGraph;
