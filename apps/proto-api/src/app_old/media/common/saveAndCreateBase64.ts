const sizeOf = require('image-size');
import { MEDIA_HOST, MEDIA_STATIC, MediaFile } from '@proto/ui/media';
import { saveBase64 } from './saveBase64';
import { MediaService } from '../media.service';

export async function saveAndCreateBase64(
  base64Data,
  data,
  mediaDir: string
): Promise<MediaFile> {
  const meta = await saveBase64(mediaDir, base64Data);

  if (!meta) {
    console.error('saveAndCreateBase64:meta null', { base64Data, data });
    return null;
  }

  const filePath = meta.path;

  const entity = new MediaFile();
  entity.id = meta.id;
  entity.name = meta.name;
  entity.originalname = meta.originalname;
  entity.mimetype = meta.mimetype;
  entity.size = meta.size || 0;
  entity.extension = meta.extension.toLowerCase() || MediaService.getExtension(meta.name);
  entity.path = filePath;
  entity.src = `${MEDIA_HOST}${MEDIA_STATIC}/${entity.name}`;
  entity.data = data;

  try {
    if (entity.mimetype.indexOf('image') >= 0) {
      const metadata = await sizeOf(filePath);
      entity.width = metadata.width;
      entity.height = metadata.height;
    }
  } catch (e) {
    console.error('file upload', e);
  }

  // return getRepository(MediaFile).save(entity);
}
