import { join } from 'path';
import { v4 } from 'uuid';
import { UploadFileMeta } from '@proto/ui/media';
import { decodeBase64Image } from './decodeBase64Image';
import { writeFile } from './writeFile';

/*
  base64Data = 'data:image/jpeg;base64,/9j/4AA...'
*/
export async function saveBase64(
  uploadedDir: string,
  base64Data: string
): Promise<UploadFileMeta> {
  const imgBuffer = decodeBase64Image(base64Data);

  if (!imgBuffer) {
    console.error('saveBase64:not base64 file', { uploadedDir, base64Data });
    return null;
  }

  const { data, mime } = imgBuffer;

  // This variable is actually an array which has 5 values,
  // The [1] value is the real image extension
  const imgTypeDetected = mime.match(/\/(.*?)$/);

  const meta: UploadFileMeta = {} as any;
  meta.mimetype = mime;

  meta.id = v4();
  meta.size = data.length;
  meta.extension = imgTypeDetected[1];
  meta.name = `${meta.id}.${imgTypeDetected[1]}`;
  meta.path = join(uploadedDir, meta.name);

  await writeFile(meta.path, data as any);

  return meta;
}
