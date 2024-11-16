import { UsersRepositoryProps } from '@/repositories/interfaces/users-repository'
import { AddressRepositoryProps } from '@/repositories/interfaces/address-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user/user-already-exists'
import { AddressCreationError } from '../errors/address/address-creation-error'
import { User, Address } from '@prisma/client'
import { Prisma } from '@prisma/client'


export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  ENTERPRISE = 'ENTERPRISE',
}

interface RegisterUseCaseParams {
  email: string
  name: string
  password: string
  role?: Role
  address?: {
    street: string
    city: string
    postalCode: string
    latitude?: number
    longitude?: number
    complement?: string
  } | null
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepositoryProps,
    private addressesRepository: AddressRepositoryProps,
  ) {}

  async execute({
    email,
    password,
    name,
    role = Role.MEMBER,
    address,
  }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    let createdAddress: Address | null = null
    if (address) {
      try {
        // If address is provided, create a new address
        createdAddress = await this.addressesRepository.create(address)
      } catch (error) {
        throw new AddressCreationError()
      }
    }

    // Prepare the user creation data
    const userData: Prisma.UserCreateInput = {
      name,
      email,
      role,
      passwordHash,
    }

    // Only add the address if it was created
    if (createdAddress) {
      userData.address = {
        connect: {
          id: createdAddress.id,
        },
      }
    }

    // Create the user and return the result
    const user = await this.usersRepository.create(userData)

    return { user }
  }
}
