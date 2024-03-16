import { http, HttpResponse } from 'msw'

import { ProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, ProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'john-doe-uuid',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '27999999999',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
