"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";



type InvoiceGraphPropsType = {
  data: {
    date: string;
    amount: number;
  }[];
};


const InvoiceGraph = ({ data }: { data: InvoiceGraphPropsType }) => {
  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--primary))",
        },
      }}
      className="min-h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Bar
            type="monotone"
            dataKey="amount"
            stroke="var(--color-amount)"
            strokeWidth={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default InvoiceGraph