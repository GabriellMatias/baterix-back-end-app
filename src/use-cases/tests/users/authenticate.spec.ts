import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memorie/in-memory-users-repository'
import { AuthenticateUseCase } from '../../user/authenticate-use-case'
import { InvalidCredentiasError } from '../../errors/user/invalid-credentiais-erro'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    const password = 'senhaSecreta';
    const hashedPassword = await hash(password, 6);
  
    await userRepository.create({
      email: 'usuario2@example.com',
      name: 'Nome do Usuário',
      passwordHash: hashedPassword,
      address: {
        create: {
          street: 'Rua Exemplo',
          city: 'Cidade Exemplo',
          postalCode: '12345-678',
          latitude: -23.55052,
          longitude: -46.633308,
          complement: 'Apto 123',
        }
      },
      role: 'ADMIN',
    })
  
    const { user } = await sut.execute({
      email: 'usuario2@example.com',
      password,
    })
  
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrongemail@example.com',
        password: 'senhaSecreta',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentiasError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password = 'senhaSecreta';
    const hashedPassword = await hash(password, 6);
  
    await userRepository.create({
      email: 'usuario2@example.com',
      name: 'Nome do Usuário',
      passwordHash: hashedPassword,
      address: {
        create: {
          street: 'Rua Exemplo',
          city: 'Cidade Exemplo',
          postalCode: '12345-678',
          latitude: -23.55052,
          longitude: -46.633308,
          complement: 'Apto 123',
        }
      },
      role: 'ADMIN',
    })
  
    await expect(() =>
      sut.execute({
        email: 'usuario2@example.com',
        password: 'senhaErrada',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentiasError)
  })
})
