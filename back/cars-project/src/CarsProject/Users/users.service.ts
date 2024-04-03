import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { UpdateUserDTO } from "./dto/update-user-dto";
import { Users, Cars, Favorite_Cars } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
    
    async create({nameUser, email, password, cpf}: CreateUserDTO) {
        return this.prisma.users.create({
            data: {
                nameUser,
                email,
                password,
                cpf
            }
        })
    }

    async list() {
        return this.prisma.users.findMany()
    }

    async show(id: number) {
        return this.prisma.users.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, data: UpdateUserDTO) {
        if (!(await this.show(id))) { 
            throw new NotFoundException(`Usuário de Id ${id} não encontrado.`)
        }
        return this.prisma.users.update({
            data,
            where: {
                id,
            }
        })
    }

    async updatePartial(id: number, {nameUser, email, password, cpf}: UpdatePatchUserDTO) {
        if (!(await this.show(id))) { 
            throw new NotFoundException(`Usuário de Id ${id} não encontrado.`)
        }

        const data: any = {}
        
        if (nameUser) {
            data.nameUser = nameUser
        }

        if (email) {
            data.email = email
        }

        if (password) {
            data.password = password
        }

        if (cpf) {
            data.cpf = cpf
        }

        return this.prisma.users.update({
            data,
            where: {
                id,
            }
        })
    }

    async delete(id: number) {
        if (!(await this.show(id))) { 
            throw new NotFoundException(`Usuário de Id ${id} não encontrado.`)
        }

        return this.prisma.users.delete({
            where: {
                id,
            } 
        })
    }

    async favoriteCar(userId: number, carId: number): Promise<Favorite_Cars | {message:string}> {
      if (typeof userId !== 'number' || isNaN(userId) || typeof carId !== 'number' || isNaN(carId)) {
        return {message:'Parâmetros em branco ou dado passado não compatível.'}
      }

      const userExists = await this.prisma.users.findUnique({ where: { id: userId } })
      const carExists = await this.prisma.cars.findUnique({ where: { id: carId } })
      if (!userExists || !carExists) {
        return {message:`Id de usuário ${userId} ou Id de cadastro de carros ${carId} não existe.`}
      }

      return this.prisma.favorite_Cars.create({
              data: {
                userId,
                carId,
            }
       })
    }
    
    async unFavoriteCar(userId: number, carId: number): Promise<void | {message:string}> {
      if (typeof userId !== 'number' || isNaN(userId) || typeof carId !== 'number' || isNaN(carId)) {
        return {message:'Parâmetros em branco ou dado passado não compatível.'}
      }

      const userExists = await this.prisma.users.findUnique({ where: { id: userId } })
      const carExists = await this.prisma.cars.findUnique({ where: { id: carId } })
    
      if (!userExists || !carExists) {
        return {message:`Id de usuário ${userId} ou Id de cadastro de carros ${carId} não existe.`}
      }

      const favoriteExists = await this.prisma.favorite_Cars.findFirst({
        where: { 
        userId,
        carId,
      }
      })

      if (!favoriteExists) {
        return {message:`Usuário de Id ${userId} não favoritou o carro de Id ${carId}.`}
      }

      await this.prisma.favorite_Cars.deleteMany({
          where: {
            userId,
            carId
          }
      })
      return {message:`Carro favorito de Id ${carId} do usuário de Id ${userId} deletado com sucesso.`}
    }
    
    async getFavoriteCars(userId: number): Promise<number[] | {message:string}> {
      if (typeof userId !== 'number' || isNaN(userId)) {
        return {message:'Parâmetros em branco ou dado passado não compatível.'}
      }
      
      if (!(await this.show(userId))) {
        throw new NotFoundException(`Usuário de Id ${userId} não encontrado.`)
      }
        
        const favorites = (await this.prisma.favorite_Cars.findMany({ 
          where: {
            userId
          }, 
         select: {
          carId: true
        },
      })).map(favorite => favorite.carId)
      
      if (!favorites.length) {
        throw new NotFoundException(`Usuário de Id ${userId} não favoritou nenhum carro.`)
      } return favorites
    } 
    
    async getUserWithFavoriteCars(userId: number): Promise<{user: Users, favoriteCars: Cars[]} | {message:string}> {
      if (typeof userId !== 'number' || isNaN(userId)) {
        throw new Error('Parâmetros em branco ou dado passado não compatível.')
      }

      if (!(await this.show(userId))) {
        throw new NotFoundException(`Usuário de Id ${userId} não encontrado.`)
      }

      const user = await this.prisma.users.findUnique({
        where: {
          id: userId,
        }
      })
      const favoriteCars = await this.prisma.favorite_Cars.findMany({
        where: {
          userId,
        },
        include: {
          car: true,
        },
      }).then(favorites => favorites.map(favorite => favorite.car))

      if (favoriteCars.length === 0) {
        return {message:`Usuário de Id ${userId} não favoritou esse cadastro.`}
      }

      return {user, favoriteCars}
    }   
}
