import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

import { EntryController } from "./entry.controller";
import { EntryService } from "./entry.service";

@Module({
    controllers: [EntryController],
    providers: [EntryService, PrismaService],
    imports:[PrismaModule, AuthModule, UserModule],
})
export class EntryModule{}