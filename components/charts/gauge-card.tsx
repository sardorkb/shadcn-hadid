"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GaugeCardProps {
  title: string;
  description?: string;
  value: number;
  max?: number;
  unit?: string;
  color?: string;
}

export function GaugeCard({
  title,
  description,
  value,
  max = 100,
  unit = "%",
  color = "hsl(var(--primary))",
}: GaugeCardProps) {
  const pct = Math.round((value / max) * 100);
  const data = [{ value: pct }];

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={14}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" fill={color} background={{ fill: "hsl(var(--secondary))" }} cornerRadius={8} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">
              {value}
              {unit}
            </span>
            <span className="text-xs text-muted-foreground">of {max}{unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
