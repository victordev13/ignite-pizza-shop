import { api } from '@/lib/axios'

interface GetDailyRevenueInPeriodParams {
  from?: Date
  to?: Date
}

type GetDailyRevenueInPeriodResponse = {
  data: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodParams) {
  const { data } = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: { from, to },
    },
  )

  return data
}
