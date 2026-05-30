"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

interface HeatMapGridUIProps {
  upCount: number;
  activeAlerts: number;
  chartData: { name: string; value: number }[];
  chartConfig: ChartConfig;
}

export default function HeatMapGridUI({
  upCount,
  activeAlerts,
  chartData,
  chartConfig,
}: HeatMapGridUIProps) {
  return (
    <Card className="w-full rounded-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Target Heat Map Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-20 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: -20 }}
            barCategoryGap={0}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="green" radius={5} barSize={30}></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
