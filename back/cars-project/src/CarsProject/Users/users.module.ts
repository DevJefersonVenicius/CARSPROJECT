import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersController } from "./users.controller";

@Module({
    imports: [PrismaModule],
    exports:  [UsersService],
    providers: [UsersService, PrismaService],
    controllers: [UsersController],
})
export class UsersModule {}
