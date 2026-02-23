/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from "@nestjs/common";
import { PrismaModule, PrismaService } from "@metadb/prisma";

import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { EntityController } from "./entity.controller";
import { MetaEntityService } from "./entity.service";

@Module({
    controllers: [EntityController],
    providers: [MetaEntityService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class EntityModule{}