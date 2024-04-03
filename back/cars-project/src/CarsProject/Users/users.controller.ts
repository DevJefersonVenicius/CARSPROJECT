import { Controller, Get, ParseIntPipe, Param, Post, Body, Put, Patch, Delete } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UsersService } from "./users.service";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async read() {
        return this.usersService.list()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.show(id)
    }

    @Post()
    create(@Body() data: CreateUserDTO) {
        return this.usersService.create(data)
    }

    @Put(':id')
    async update(@Body() data: CreateUserDTO, @Param('id', ParseIntPipe) id: number) {
        return this.usersService.update(id, data)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number)  {
        return this.usersService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }

    @Post(':userId/favorite-car/:carId') // Favoritar um carro
    async favoriteCar(@Param('userId') userId: string, @Param('carId') carId: string) {
        return this.usersService.favoriteCar(Number(userId), Number(carId))
    }
    
    @Get(':userId/favorite-cars') // Mostrar todos os cadastros favoritados pelo usuário
    async getFavoriteCars(@Param('userId') userId: string) {
        return this.usersService.getFavoriteCars(Number(userId));
    }
    
    @Get(':userId/favorite') // Mostrar o cadastro completo do cadastro de carros favoritado pelo usuário
    async listFavoriteCar(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.getUserWithFavoriteCars(userId)
    }

    @Delete(':userId/unfavorite-car/:carId') // Deletar um favorite
    async unfavoriteCar(@Param('userId') userId: string, @Param('carId') carId: string) {
        return this.usersService.unFavoriteCar(Number(userId), Number(carId))  
    }

}
