import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService }  from 'src/prisma/prisma.service';

import { createMediaSeed } from './media.seed';
import { createComponentSeed } from './component.seed';
import { createPageSeed } from './page.seed';

import { createUserSeed } from './user.seed';
import { createUserSeed as createUserAdminSeed } from './admin-user.seed';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await createMediaSeed(this.prisma);
    await createComponentSeed(this.prisma);
    await createPageSeed(this.prisma);

    await createUserSeed(this.prisma);
    await createUserAdminSeed(this.prisma);
  }

  //async seedAppConfig() {
  // const config = await this.prisma.appConfig.findFirst();
  // if (!config) {
  //   const userConnect = await createConfigUser(this.prisma);
  //   const mediaConnect = await createConfigMedia(this.prisma);
  //   await this.prisma.appConfig.create({
  //     data: {
  //       user: {
  //         connect: userConnect
  //       },
  //       media: {
  //         connect: mediaConnect
  //       }
  //     }
  //   });
  // }
  // }
  // async seedAdminUser() {
  //   const adminUser = await this.prisma.user.findUnique({
  //     where: { name: 'Admin' }
  //   });
  //   if (!adminUser) {
  //     await this.prisma.user.create({
  //       data: {
  //         name: 'Admin',
  //         email: 'admin@example.com',
  //         password: 'Admin@123'
  //       }
  //       // create: {},
  //       // update: {}
  //     });
  //     console.log('User Admin created.');
  //   } else {
  //     console.log('User Admin already exists.');
  //   }
  // }
}
