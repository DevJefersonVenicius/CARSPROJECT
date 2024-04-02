import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRegisterCarDTO } from "./dto/create-registercar-dto";
import { UpdatePatchRegisterCarDTO } from "./dto/update-patch-registercar-dto";
import { UpdateRegisterCarDTO } from "./dto/update-registercar-dto";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class RegistersCarsService {
    constructor(private readonly prisma: PrismaService) {}

    async create({nameCar, brand, model, version, color, description, accessories, location, phone, year, km, price, images}: CreateRegisterCarDTO) {
        return this.prisma.cars.create({
            data: {
                nameCar,
                brand,
                model,
                version,
                color,
                description,
                accessories,
                location,
                phone,
                year,
                km,
                price,
                images,
            } 
        })
    }

    async list() {
        return this.prisma.cars.findMany()
    }

    async show(id: number) {
        return this.prisma.cars.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, data: UpdateRegisterCarDTO) {
        if (!(await this.show(id))) { 
            throw new NotFoundException(`Usuário de id ${id} não encontrado.`)
        }
        return this.prisma.cars.update({
            data,
            where: {
                id,
            }
        })
    }

    async updatePartial(id: number, {nameCar, brand, model, version, color, description, accessories, location, phone, year, km, price, images}: UpdatePatchRegisterCarDTO) {

        const data: any = {}

        if (!(await this.show(id))) { 
            throw new NotFoundException(`Usuário de id ${id} não encontrado.`)
        }

        if (nameCar) {
            data.nameCar = nameCar
        }

        if (brand) {
            data.brand = brand
        }

        if (model) {
            data.model = model
        }

        if(version) {
            data.version = version
        }

        if (color) {
            data.color = color
        }

        if (description) {
            data.description = description 
        }

        if (accessories) {
            data.acessórios = accessories
        }

        if (location) {
            data.location = location
        }

        if (phone) {
            data.phone = phone
        }

        if(year) {
            data.year = year
        }

        if (km) {
            data.km = km
        }

        if (price) {
            data.price = price
        }

        if (images) {
            data.images = images
        }

        return this.prisma.cars.update({
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
        return this.prisma.cars.delete({
            where: {
                id,
            }
        })
    }
}
