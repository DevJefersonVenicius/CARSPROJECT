import { Module } from "@nestjs/common";
import { RegistersCarsController } from "./registerscars.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { RegistersCarsService } from "./registerscars.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [PrismaModule],
    exports: [RegistersCarsService],
    controllers: [RegistersCarsController],
    providers: [RegistersCarsService, PrismaService],
})
export class RegistersCarsModule {

}
