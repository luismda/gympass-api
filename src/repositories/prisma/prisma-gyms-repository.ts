import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findManyNearby({ coordinates, page }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT 
        * 
      FROM 
        gyms
      WHERE 
        ( 6371 * acos( cos( radians(${
          coordinates.latitude
        }) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${
      coordinates.longitude
    }) ) + sin( radians(${
      coordinates.latitude
    }) ) * sin( radians( latitude ) ) ) ) <= 10
      LIMIT 20
      OFFSET ${(page - 1) * 20}
    `

    return gyms
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
