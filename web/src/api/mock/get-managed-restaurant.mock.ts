import { http, HttpResponse } from 'msw'

import { ManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  ManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'pizza-shop-id',
    name: 'Pizza Shop',
    description: 'Pizza Shop restaurant is available',
    managerId: 'pizza-shop-manager-id',
    createdAt: new Date(),
    updatedAt: null,
  })
})
