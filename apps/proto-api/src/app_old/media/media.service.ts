import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMediaFile, MediaFileType } from '@atlas/shared';
import { EntryService } from 'src/entry/entry.service';
import { MEDIA_STATIC, MediaFile } from '@proto/ui/media';
import { existsSync, unlink } from 'fs';

import { getHash } from './common/getHash';
const sizeOf = require('image-size');

@Injectable()
export class MediaService {
  constructor(private entryService: EntryService) {}

  async delete(id: string) {
    const media = await this.entryService.getById(id);
    if (media) {
      await this.entryService.deleteById(id);
      return this.remove(media).then(() => true);
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async upload(originalname: string, file: Express.Multer.File) {
    const record: IMediaFile = {};

    record.name = originalname;
    record.originalname = originalname;
    record.mimetype = file.mimetype;
    record.size = file.size || 0;
    record.src = `${MEDIA_STATIC}/${file.filename}`;
    record.extension = MediaService.getExtension(originalname);
    record.path = file.path;
    record.hash = await getHash(file.path);

    try {
      if (record.mimetype.indexOf('image') >= 0) {
        const metadata = await sizeOf(record.path);
        record.width = metadata.width;
        record.height = metadata.height;
        record.type = MediaFileType.IMAGE;
        record.isImage = true;
      }
    } catch (e) {
      console.error('file upload', e);
    }

    if (MediaService.getName(file.filename)) {
      const recordId = MediaService.getName(file.filename);
      return this.entryService.createById(recordId, 'MEDIA', record);
    } else {
      return this.entryService.create('MEDIA', record);
    }
  }

  public static isImage(filename: string) {
    const extension = this.getExtension(filename);

    return (
      extension === 'png' ||
      extension === 'gif' ||
      extension === 'jpg' ||
      extension === 'jpeg'
    );
  }

  public static getExtension(filename: string) {
    if (!filename) {
      return null;
    }

    const ar = filename.split('.');

    if (ar.length == 1) {
      return '';
    } else {
      return ar.pop().toLowerCase();
    }
  }

  public static getName(filename: string) {
    if (!filename) return null;

    return filename.split('.').shift();
  }

  public supportedDataTypes = [
    { extension: 'png', isImage: true },
    { extension: 'jpg', isImage: true },
    { extension: 'jpeg', isImage: true },
    { extension: 'gif', isImage: true },

    { extension: 'doc', isImage: false },
    { extension: 'pdf', isImage: false },
    { extension: 'xls', isImage: false },
    { extension: 'docx', isImage: false },
    { extension: 'xlsx', isImage: false }
  ];

  public sizes = [
    { name: 'original', width: null, height: null },
    { name: 'thumb1', width: 100, height: 100 },
    { name: 'thumb2', width: 200, height: 200 },
    { name: 'thumb3', width: 300, height: 300 }
  ];

  public async remove(file: MediaFile | MediaFile[]): Promise<any> {
    if (!file) {
      return null;
    }

    if (Array.isArray(file)) {
      const items = file;
      const result = [];
      for (let i = 0; items.length > i; i++) {
        const value = await this.remove(items[i]);
        result.push(value);
      }

      return result;
    } else {
      return this._unlinkByPath(file.path)
        .catch(() => {
          return Promise.resolve(false);
        })
        .then(() => {
          //return getRepository(MediaFile).delete(file.id);
        })
        .catch(() => {
          return Promise.resolve(false);
        });
    }
  }

  protected _unlinkByPath(path: string) {
    return new Promise((res, reg) => {
      if (existsSync(path)) {
        // exists
        unlink(path, function (err) {
          if (err) {
            reg(err);
          } else {
            res(0);
          }
        });
      } else {
        res(0);
      }
      // stat(path, function(err, stats) {
      //   if (err) {
      //     return reg(err);
      //   }
      // });
    });
  }
}
