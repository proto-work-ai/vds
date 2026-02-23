import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

import { EntityController } from "./entity.controller";
import { TypeService } from "./entity.service";

@Module({
    controllers: [EntityController],
    providers: [TypeService, PrismaService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class EntityModule{}