import { expect, test } from '@playwright/test'

test('display day orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const divDayOrdersCard = page.getByTestId('day-orders-amount-card')

  expect(divDayOrdersCard).toBeVisible()

  const dayOrdersAmount = divDayOrdersCard.getByText('21')
  expect(dayOrdersAmount).toBeVisible()

  const dayOrdersAmountLabel = divDayOrdersCard
    .locator('div')
    .last()
    .locator('p')

  expect(dayOrdersAmountLabel).toHaveText('-5% em relação à ontem')
})

test('display month revenue metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const monthRevenueCard = page.getByTestId('month-revenue-card')

  expect(monthRevenueCard).toBeVisible()

  const monthRevenueTotal = monthRevenueCard
    .locator('span')
    .getByText('R$ 22.000,00')

  expect(monthRevenueTotal).toBeVisible()

  const monthRevenueLabel = monthRevenueCard.locator('div').last().locator('p')

  expect(monthRevenueLabel).toHaveText('+19% em relação ao mês passado')
})

test('display month orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const monthOrdersAmountCard = page.getByTestId('month-orders-amount-card')

  expect(monthOrdersAmountCard).toBeVisible()

  const monthOrdersAmountTotal = monthOrdersAmountCard
    .locator('span')
    .getByText('530')

  expect(monthOrdersAmountTotal).toBeVisible()

  const monthOrdersAmountLabel = monthOrdersAmountCard
    .locator('div')
    .last()
    .locator('p')

  expect(monthOrdersAmountLabel).toHaveText('+12% em relação ao mês passado')
})

test('display canceled month orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const canceledMonthOrdersAmountCard = page.getByTestId(
    'month-canceled-orders-amount-card',
  )

  expect(canceledMonthOrdersAmountCard).toBeVisible()

  const canceledMonthOrdersAmountTotal = canceledMonthOrdersAmountCard
    .locator('span')
    .getByText('10')

  expect(canceledMonthOrdersAmountTotal).toBeVisible()

  const canceledMonthOrdersAmountLabel = canceledMonthOrdersAmountCard
    .locator('div')
    .last()
    .locator('p')

  expect(canceledMonthOrdersAmountLabel).toHaveText(
    '-5% em relação ao mês passado',
  )
})
