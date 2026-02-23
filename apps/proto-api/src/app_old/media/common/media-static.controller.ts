import { Controller, Get, Res, Param, Query } from '@nestjs/common';
import { MEDIA_STATIC } from '@proto/ui/media';

import { existsSync } from 'fs';
import { join, resolve, isAbsolute } from 'path';
import { Response } from 'express';
import * as sharp from 'sharp';
// import * as lwip from 'lwip';
// import * as jimp from 'jimp';

import env from '../../environments';

// var favicons = require("favicons");

@Controller(MEDIA_STATIC)
export class MediaStaticController {
  configuration = {
    path: '/media/data', // Path for overriding default icons path. `string`
    appName: null, // Your application's name. `string`
    appShortName: null, // Your application's short_name. `string`. Optional. If not set, appName will be used
    appDescription: null, // Your application's description. `string`
    developerName: null, // Your (or your developer's) name. `string`
    developerURL: null, // Your (or your developer's) URL. `string`
    dir: 'auto', // Primary text direction for name, short_name, and description
    lang: 'en-US', // Primary language for name and short_name
    background: '#fff', // Background colour for flattened icons. `string`
    theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
    appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
    display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
    orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
    scope: '/', // set of URLs that the browser considers within your app
    start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
    version: '1.0', // Your application's version string. `string`
    logging: false, // Print logs to console? `boolean`
    pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
    loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
    icons: {
      android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      favicons: true // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    }
  };

  // TODO добавить кешь для файлов
  @Get(':name') // @OnUndefined(404) @async_timer()
  public async getByName(
    @Param('name') name: string,
    @Query('h') h: string,
    @Query('w') w: string,
    @Query('c') c: string,
    @Res() res: Response
  ) {
    const filePath = this.preparePath(name);

    if (existsSync(filePath)) {
      // https://stackoverflow.com/questions/24026320/node-js-image-resizing-without-imagemagick/28148572
      const crop = parseInt(c, 0) || null;
      let width = parseInt(w, 0) || null;
      let height = parseInt(h, 0) || null;

      if (crop) {
        width = height = crop;
      }

      if (!filePath.endsWith('svg')) {
        if (width || height) {
          const buffer = await sharp(filePath)
            .resize(width, height)
            // .jpeg({ mozjpeg: true, quality: 100 })
            .toBuffer();

          return res.send(buffer);
        }
      }

      return res.sendFile(filePath); // const buf = fs.readFileSync(filePath);eturn buf;
    } else {
      return res.status(404).send('Not found'); // throw new HttpException('File not found', 404);// 404
    }
  }

  protected preparePath(name: string) {
    let filePath = join(env.media.MEDIA_DIR, name);
    if (!isAbsolute(filePath)) {
      filePath = resolve(filePath);
    }

    return filePath;
  }
}
/*
public getByName2( @Param('name') name: string, @Req() req: any, @Res() res: Response) {
    var path = `_uploads/${name}`;
    const fs = require('fs-extra');
    fs.readFile(path, function (err: any, fileBuffer: any) {
      if (err) {
        res.writeHead(404);
        res.end();
      }
      else {
        const mime = require('mime');
        res.setHeader('Content-Type', mime.lookup(path));
        res.write(fileBuffer);
        res.end();
      }
    });
  }
*/
