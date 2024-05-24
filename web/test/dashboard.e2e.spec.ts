import { expect, test } from '@playwright/test'

test('display day orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const divDayOrdersCard = page.getByTestId('day-orders-amount-card')

  await expect(divDayOrdersCard).toBeVisible()

  const dayOrdersAmount = divDayOrdersCard.getByText('21')
  await expect(dayOrdersAmount).toBeVisible()

  const dayOrdersAmountLabel = divDayOrdersCard
    .locator('div')
    .last()
    .locator('p')

  await expect(dayOrdersAmountLabel).toHaveText('-5% em relação à ontem')
})

test('display month revenue metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const monthRevenueCard = page.getByTestId('month-revenue-card')

  await expect(monthRevenueCard).toBeVisible()

  const monthRevenueTotal = monthRevenueCard
    .locator('span')
    .getByText('R$ 22.000,00')

  await expect(monthRevenueTotal).toBeVisible()

  const monthRevenueLabel = monthRevenueCard.locator('div').last().locator('p')

  await expect(monthRevenueLabel).toHaveText('+19% em relação ao mês passado')
})

test('display month orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const monthOrdersAmountCard = page.getByTestId('month-orders-amount-card')

  await expect(monthOrdersAmountCard).toBeVisible()

  const monthOrdersAmountTotal = monthOrdersAmountCard
    .locator('span')
    .getByText('530')

  await expect(monthOrdersAmountTotal).toBeVisible()

  const monthOrdersAmountLabel = monthOrdersAmountCard
    .locator('div')
    .last()
    .locator('p')

  await expect(monthOrdersAmountLabel).toHaveText(
    '+12% em relação ao mês passado',
  )
})

test('display canceled month orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const canceledMonthOrdersAmountCard = page.getByTestId(
    'month-canceled-orders-amount-card',
  )

  await expect(canceledMonthOrdersAmountCard).toBeVisible()

  const canceledMonthOrdersAmountTotal = canceledMonthOrdersAmountCard
    .locator('span')
    .getByText('10')

  await expect(canceledMonthOrdersAmountTotal).toBeVisible()

  const canceledMonthOrdersAmountLabel = canceledMonthOrdersAmountCard
    .locator('div')
    .last()
    .locator('p')

  await expect(canceledMonthOrdersAmountLabel).toHaveText(
    '-5% em relação ao mês passado',
  )
})
