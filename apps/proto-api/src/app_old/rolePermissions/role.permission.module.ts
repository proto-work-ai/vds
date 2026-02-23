import { Module } from "@nestjs/common";
import { RolePermissionController } from "./role.permission.controller";
import { RolePermissionService } from "./role.permission.service";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
    controllers: [RolePermissionController],
    providers: [RolePermissionService, PrismaService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class RolePermissionModule{}