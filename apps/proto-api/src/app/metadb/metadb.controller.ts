import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { VERSION } from './common/version';
import { indexPage } from './app.controller.html';

@Controller()
export class AppController {
  @Get('/')
  default(@Res() res: Response) {
    res.send(indexPage);
  }

  @Get('.htaccess')
  root(@Res() res) {
    res.send(`
    <IfModule mod_rewrite.c >
    RewriteEngine on
    RewriteCond %{HTTP_HOST} ^domain\.ru [NC]
    RewriteRule ^(.*)$ https://www.proto.ru/$1 [L,R=301]
    < /IfModule >
    `);
  }

  @Get('api/server')
  status(): any {
    const { uptime, arch, version, platform } = process;
    return {
      version: VERSION,
      // stack,
      server: {
        uptime: uptime(),
        arch,
        version,
        platform
      }
    };
  }
}
