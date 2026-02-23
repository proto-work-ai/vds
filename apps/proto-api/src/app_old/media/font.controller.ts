import {
  Post,
  Controller,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  getFontWeight,
  getFontStyle,
  FontInfo,
  getFontName
} from '@atlas/shared';
import * as fontkit from 'fontkit';
import { Font } from 'fontkit';
import { MediaService } from './media.service';

@Controller('font')
export class FontMediaController {
  constructor(public mediaService: MediaService) {}

  @Post('info')
  @UseInterceptors(FileInterceptor('file'))
  fontInformer(@UploadedFile() file: Express.Multer.File) {
    const font: Font = (fontkit as any).create(file.buffer);
    const { familyName, copyright, version } = font;

    let name = familyName;
    let style: string;
    let weight: string;

    // name
    if (!name || name.toLowerCase().includes('unnamed')) {
      name = getFontName(file.originalname);
    }

    // weight
    if (getFontWeight(name)) {
      weight = getFontWeight(name);
    } else {
      weight = getFontWeight(file.originalname);
    }

    // style
    if (getFontStyle(name)) {
      style = getFontStyle(name);
    } else {
      style = getFontStyle(file.originalname) || 'normal';
    }

    return <FontInfo>{
      name,
      style,
      weight,
      copyright,
      version: <unknown>version
    };
  }
}
