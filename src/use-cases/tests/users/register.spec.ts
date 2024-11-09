import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../../user/register-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memorie/in-memory-users-repository'
import { InMemoryAddressRepository } from '../../../repositories/in-memorie/in-memorie-address-repostory.ts'
import { UserAlreadyExistsError } from '../../errors/user/user-already-exists'

let userRepository: InMemoryUserRepository
let addressRepository: InMemoryAddressRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    addressRepository = new InMemoryAddressRepository()
    sut = new RegisterUseCase(userRepository, addressRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jhon doe',
      email: 'Matias@gmail.comm',
      password: '123456',
      address: {
        street: 'Rua Teste',
        city: 'Cidade Teste',
        postalCode: '12345-678',
      },
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.passwordHash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email', async () => {
    const email = 'Matias@gmail.com'

    await sut.execute({
      name: 'Jhon doe',
      email,
      password: '123456',
      address: {
        street: 'Rua Teste',
        city: 'Cidade Teste',
        postalCode: '12345-678',
      },
    })

    await expect(() =>
      sut.execute({
        name: 'Jhon doe',
        email,
        password: '123456',
        address: {
          street: 'Rua Teste',
          city: 'Cidade Teste',
          postalCode: '12345-678',
        },
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jhon doe',
      email: 'Matias@gmail.comm',
      password: '123456',
      address: {
        street: 'Rua Teste',
        city: 'Cidade Teste',
        postalCode: '12345-678',
      },
    })

    expect(user.id).toEqual(expect.any(String))
  })
})