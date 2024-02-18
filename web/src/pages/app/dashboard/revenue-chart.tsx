import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import { DateRangePicker } from '@/components/date-range-picker'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import money from '@/utils/money'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    queryKey: ['metrics', 'revenue-daily-in-period', dateRange],
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((row) => ({
      ...row,
      // receipt: row.receipt / 100,
    }))
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6 bg-transparent">
      <CardHeader className="flex-row items-center justify-between pb-8 ">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {!chartData ? (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => money.formatFromCents(value)}
                width={80}
              />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                name="Receita"
                stroke={colors.violet[500]}
              />

              <CartesianGrid vertical={false} className="stroke-muted" />
              <Tooltip
                labelClassName="text-[#888]"
                formatter={(value) =>
                  money.formatFromCents(Number(value.toString()))
                }
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] items-center justify-center text-zinc-300">
            <p>N/A</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
