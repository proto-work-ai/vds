import { Module } from "@nestjs/common";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
    controllers: [PermissionController],
    providers: [PermissionService, PrismaService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class PermissionModule{}