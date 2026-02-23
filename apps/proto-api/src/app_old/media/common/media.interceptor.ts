import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { MAX_SIZE } from '@proto/ui/media';

import { mkdirSync } from './mkdir';
import { MediaService } from '../media.service';
const mediaDir = mkdirSync('./media/data');

export const MediaInterceptor = FileInterceptor('file', {
  fileFilter: (req: any, file: any, fn: any) => {
    fn(null, true);
  },
  storage: diskStorage({
    destination: (req: any, file: any, fn: any) => {
      debugger;
      fn(null, mediaDir);
    },
    filename: (req: any, file: any, fn: any) => {
      const extension = MediaService.getExtension(file.originalname);
      let name;
      if (extension) {
        name = `${v4()}.${extension.toLowerCase()}`;
      } else {
        name = v4();
      }

      fn(null, name);
    }
  }),
  limits: {
    fieldNameSize: 255,
    fileSize: <any>MAX_SIZE[0]
  }
});
