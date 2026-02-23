import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
    controllers: [RoleController],
    providers: [RoleService, PrismaService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class RoleModule{}