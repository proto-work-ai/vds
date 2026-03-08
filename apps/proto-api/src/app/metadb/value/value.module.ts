/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from "@nestjs/common";
import { PrismaModule } from "@metadb/prisma";

import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { ValueController } from "./value.controller";
import { MetaValueSevice } from "./value.service";

@Module({
  controllers: [ValueController],
  providers: [MetaValueSevice],
  imports: [PrismaModule, AuthModule, UserModule],
})
export class ValueModule { }
