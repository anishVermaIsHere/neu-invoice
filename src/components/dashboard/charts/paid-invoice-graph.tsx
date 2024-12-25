"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";



type InvoiceGraphPropsType = {
    date: string;
    amount: number;
}[];


const PaidInvoiceGraph = ({ data }: { data: InvoiceGraphPropsType }) => {

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
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default PaidInvoiceGraph