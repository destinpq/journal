"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { WeightEntry } from "@/lib/types"

interface ProgressChartProps {
  weightEntries: WeightEntry[]
  accentColor?: string
}

export default function ProgressChart({ weightEntries, accentColor = "hsl(var(--chart-1))" }: ProgressChartProps) {
  const chartData = [...weightEntries] // Create a new array before sorting
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((entry) => ({
      date: format(entry.date, "MMM d"),
      weight: entry.weight,
      fullDate: format(entry.date, "PPP"),
    }))

  if (weightEntries.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-700/95 to-gray-800/95 border-amber-500/60 shadow-xl shadow-amber-500/20">
        {" "}
        {/* Changed to fully opaque */}
        <CardHeader>
          <CardTitle className="text-amber-400">Weight Progress</CardTitle>
          <CardDescription className="text-amber-200">
            No weight entries yet. Add your first entry to see your progress!
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-amber-200 text-lg">Chart will appear here.</p>
        </CardContent>
      </Card>
    )
  }

  const yAxisDomain: [number, number] =
    chartData.length > 0
      ? [Math.min(...chartData.map((d) => d.weight)) - 2, Math.max(...chartData.map((d) => d.weight)) + 2]
      : [0, 100]

  return (
    <Card className="bg-gradient-to-br from-gray-700/95 to-gray-800/95 border-amber-500/60 shadow-xl shadow-amber-500/20">
      {" "}
      {/* Changed to fully opaque */}
      <CardHeader>
        <CardTitle className="text-amber-400">Weight Progress</CardTitle>
        <CardDescription className="text-amber-200">Your weight journey over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            weight: {
              label: "Weight (kg)", // Assuming kg, adjust as needed
              color: accentColor,
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                strokeOpacity={0.2}
                stroke="var(--color-text-muted-foreground)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="var(--color-text-muted-foreground)"
              />
              <YAxis
                dataKey="weight"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={yAxisDomain}
                label={{
                  value: "Weight (kg)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  fill: "var(--color-text-muted-foreground)",
                }}
                stroke="var(--color-text-muted-foreground)"
              />
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value, payload) => {
                      if (payload && payload.length > 0 && payload[0].payload.fullDate) {
                        return payload[0].payload.fullDate
                      }
                      return value
                    }}
                    formatter={(value) => [`${value} kg`, "Weight"]}
                    wrapperClassName="!bg-slate-800 !border-slate-700 !shadow-lg"
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke={accentColor}
                strokeWidth={2}
                dot={{ r: 4, fill: accentColor, strokeWidth: 2, stroke: "var(--color-background)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
