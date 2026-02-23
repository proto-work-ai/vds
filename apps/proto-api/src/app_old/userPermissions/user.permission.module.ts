import { Module } from "@nestjs/common";
import { UserPermissionController } from "./user.permission.controller";
import { UserPermissionService } from "./user.permission.service";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
    controllers: [UserPermissionController],
    providers: [UserPermissionService, PrismaService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class UserPermissionModule{}