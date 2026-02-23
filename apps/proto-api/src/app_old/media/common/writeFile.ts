import { dirname, join } from 'path';
import * as fs from 'fs';
import { mkdirSync } from './mkdir';

export async function writeFile(
  path: string | string[],
  data: string | NodeJS.ArrayBufferView
) {
  try {
    if (Array.isArray(path)) {
      path = join(...path);
    }

    const dir = dirname(path);
    if (fs.existsSync(dir)) {
      mkdirSync(dir);
    }

    return new Promise((res, rej) => {
      fs.writeFile(path as string, data, function (err: NodeJS.ErrnoException) {
        if (err) {
          rej(err);
        } else {
          res(true);
        }
      });
    });
  } catch (err) {
    throw new Error(err);
  }
}
