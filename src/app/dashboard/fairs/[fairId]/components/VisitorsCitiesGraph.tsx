"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  cities: {
    city: string;
    count: number;
  }[];
}

export function VisitorsCitiesGraph({ cities }: Props) {
  const chartConfig = {
    count: {
      label: "Visitantes",
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig;

  const capitalize = (value: string) => {
    return value
      .split(" ")
      .map((val) => `${val[0].toUpperCase()}${val.slice(1).toLowerCase()}`)
      .join(" ");
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-60 w-full">
      <BarChart data={cities}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="city" tickMargin={8} tickFormatter={capitalize} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          amplitude={1}
          allowDecimals={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
