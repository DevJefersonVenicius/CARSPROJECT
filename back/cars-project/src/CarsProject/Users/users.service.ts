import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { UpdateUserDTO } from "./dto/update-user-dto";

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
            throw new NotFoundException(`Usuário de id ${id} não encontrado.`)
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
            throw new NotFoundException(`Usuário de id ${id} não encontrado.`)
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
            throw new NotFoundException(`Usuário de id ${id} não encontrado.`)
        }

        return this.prisma.users.delete({
            where: {
                id,
            } 
        })
    }
}
