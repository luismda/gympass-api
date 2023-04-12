import type { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseRequest {
  userCoordinates: {
    latitude: number
    longitude: number
  }
  page: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userCoordinates,
    page,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      coordinates: {
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude,
      },
      page,
    })

    return {
      gyms,
    }
  }
}
