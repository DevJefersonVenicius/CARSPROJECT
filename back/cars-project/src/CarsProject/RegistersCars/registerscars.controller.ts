import { Controller, Get, Body, Post, Param, ParseIntPipe, Put, Patch, Delete } from "@nestjs/common";
import { CreateRegisterCarDTO } from "./dto/create-registercar-dto";
import { RegistersCarsService } from "./registerscars.service";
import { UpdateRegisterCarDTO } from "./dto/update-registercar-dto";
import { UpdatePatchRegisterCarDTO } from "./dto/update-patch-registercar-dto";

@Controller('registerscars')
export class RegistersCarsController {
    constructor(private readonly registerCarsService: RegistersCarsService) {}
    
    @Get()
    async read() {
        return this.registerCarsService.list()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return this.registerCarsService.show(id)
    }

    @Post()
    create(@Body() data: CreateRegisterCarDTO ) {
        return this.registerCarsService.create(data)
    }

    @Put(':id')
    async update(@Body() data: UpdateRegisterCarDTO, @Param('id', ParseIntPipe) id: number) {
        return this.registerCarsService.update(id, data)
    }

    @Patch(':id') 
    async updatePartial(@Body() data: UpdatePatchRegisterCarDTO, @Param('id', ParseIntPipe) id: number) {
        return this.registerCarsService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.registerCarsService.delete(id)
    }
    
}
