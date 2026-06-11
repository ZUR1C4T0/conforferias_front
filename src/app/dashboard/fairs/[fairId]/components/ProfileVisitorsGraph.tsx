"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  profiles: {
    id: string;
    name: string;
    contacts: number;
  }[];
  total: number;
}

export function ProfileVisitorsGraph({ profiles, total }: Props) {
  const chartConfig = {
    contacts: {
      label: "Contactos",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const chartData = profiles.map(({ name, contacts }) => ({
    name,
    contacts,
    percentage: Math.round((contacts / total) * 100),
  }));

  return (
    <ChartContainer config={chartConfig} className="max-h-52 w-full">
      <BarChart data={chartData} layout="vertical">
        <XAxis type="number" domain={[0, total]} hide />
        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={120}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => [
                `${value} contactos (${Math.round((Number(value) / total) * 100)}%)`,
                "",
              ]}
            />
          }
        />
        <Bar
          dataKey="contacts"
          fill="var(--color-contacts)"
          radius={4}
          maxBarSize={30}
          label={{
            position: "right",
            formatter: (value: number) =>
              `${Math.round((value / total) * 100)}%`,
            fontSize: 12,
            fontWeight: 500,
          }}
        />
      </BarChart>
    </ChartContainer>
  );
}
