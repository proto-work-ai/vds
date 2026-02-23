export function decodeBase64Image(dataString): { mime: string; data: Buffer } {
  if (typeof dataString !== 'string') {
    return null;
  }

  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (!matches) {
    return null;
  }

  if (matches.length !== 3) {
    return null;
  }

  const response = { mime: '', data: null };

  response.mime = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}
