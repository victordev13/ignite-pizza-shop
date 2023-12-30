import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import money from '@/utils/money'

const fakeData = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 90 },
  { date: '12/12', revenue: 3000 },
  { date: '13/12', revenue: 2200 },
  { date: '14/12', revenue: 998 },
  { date: '15/12', revenue: 887 },
  { date: '16/12', revenue: 1780 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6 bg-transparent">
      <CardHeader className="flex-row items-center justify-between pb-8 ">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={fakeData} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />

            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => money.format(value)}
              width={80}
            />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet[500]}
            />

            <CartesianGrid vertical={false} className="stroke-muted" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
