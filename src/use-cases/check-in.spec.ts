import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { it, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym1',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -21.5842816,
      longitude: -46.9106688,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user1',
      gymId: 'gym1',
      userLatitude: -21.5842816,
      userLongitude: -46.9106688,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 10, 8, 0, 0))

    await sut.execute({
      userId: 'user1',
      gymId: 'gym1',
      userLatitude: -21.5842816,
      userLongitude: -46.9106688,
    })

    await expect(() =>
      sut.execute({
        userId: 'user1',
        gymId: 'gym1',
        userLatitude: -21.5842816,
        userLongitude: -46.9106688,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 10, 8, 0, 0))

    await sut.execute({
      userId: 'user1',
      gymId: 'gym1',
      userLatitude: -21.5842816,
      userLongitude: -46.9106688,
    })

    vi.setSystemTime(new Date(2023, 3, 11, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user1',
      gymId: 'gym1',
      userLatitude: -21.5842816,
      userLongitude: -46.9106688,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym2',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -21.368696,
      longitude: -46.697345,
    })

    await expect(() =>
      sut.execute({
        userId: 'user1',
        gymId: 'gym2',
        userLatitude: -21.5842816,
        userLongitude: -46.9106688,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
