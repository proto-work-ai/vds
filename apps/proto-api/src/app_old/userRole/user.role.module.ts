import { Module } from "@nestjs/common";
import { UserRoleController } from "./user.role.controller";
import { UserRoleService } from "./user.role.service";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
    controllers: [UserRoleController],
    providers: [UserRoleService, PrismaService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class UserRoleModule{}