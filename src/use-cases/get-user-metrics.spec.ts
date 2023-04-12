import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym1',
      user_id: 'user1',
    })

    await checkInsRepository.create({
      gym_id: 'gym2',
      user_id: 'user1',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
