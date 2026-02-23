import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

import { AttributeController } from "./attribute.controller";
import { AttributeSevice } from "./attribute.service";

@Module({
    controllers: [AttributeController],
    providers: [AttributeSevice, PrismaService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class AttributeModule{}