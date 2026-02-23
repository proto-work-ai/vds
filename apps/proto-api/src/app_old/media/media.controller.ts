import {
  Delete,
  Post,
  Param,
  Controller,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Body,
  Get,
  Query,
  Res
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EntryService } from 'src/entry/entry.service';
import { join, resolve, isAbsolute } from 'path';
import * as sharp from 'sharp';
import { existsSync } from 'fs';
import { Response } from 'express';

import env from '../environments';
import { MediaService } from './media.service';
import { saveAndCreateBase64 } from './common/saveAndCreateBase64';
import { MediaInterceptor } from './common/media.interceptor';

@ApiTags('Media')
@Controller('media')
@ApiBearerAuth()
export class MediaController {
  constructor(
    public mediaService: MediaService,
    public entryService: EntryService
  ) {}

  @Get(':name')
  @ApiResponse({ status: 200, description: 'Get a media by ID' })
  async getById(
    // @Param('id') id: string,
    @Param('name') name: string,
    @Query('h') h: string,
    @Query('w') w: string,
    @Query('c') c: string,
    @Res() res: Response
  ) {
    const filePath = this.preparePath(name);

    console.log('filePath', filePath);
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

  private preparePath(name: string) {
    let filePath = join(env.media.MEDIA_DIR, name);
    if (!isAbsolute(filePath)) {
      filePath = resolve(filePath);
    }

    return filePath;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a media by ID' })
  public async removeById(@Param('id') id: string) {
    return this.mediaService.delete(id);
  }

  /*
   * https://stackoverflow.com/questions/49096068/upload-file-using-nestjs-and-multer
    @Post()
    @UseInterceptors(FileInterceptor('filename')) async upload(@UploadedFile() file) {console.log(file)}
  */
  @ApiResponse({ status: 200, description: 'File Upload' })
  @UseInterceptors(MediaInterceptor)
  @Post('upload')
  async uploadFile(
    @Body() body: { name: string },
    @UploadedFile() file: Express.Multer.File
  ) {
    const originalname = body.name ?? file.originalname;
    return this.mediaService.upload(originalname, file);
  }

  @Post('upload64')
  @ApiResponse({ status: 200, description: 'Upload a media by ID' })
  public async upload64(@Body() textFile: string) {
    return saveAndCreateBase64(textFile, null, env.media.MEDIA_DIR).then(
      (model) => model as any
    );
  }
}
