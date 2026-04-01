function getRandomInt(x: number): number {
  if (x < 0 || x > 53) {
    return NaN;
  }
  var n = 0 | (Math.random() * 0x40000000); // 1 << 30
  return x > 30 ? n + (0 | (Math.random() * (1 << (x - 30)))) * 0x40000000 : n >>> (30 - x);
}

function hexAligner(num: number, length: number): string {
  var str = num.toString(16),
    i = length - str.length,
    z = '0';
  for (; i > 0; i >>>= 1, z += z) {
    if (i & 1) {
      str = z + str;
    }
  }
  return str;
}

export function generateUuid(): string {
  let rand = getRandomInt,
    hex = hexAligner;
  return (
    hex(rand(32), 8) + // time_low
    '-' +
    hex(rand(16), 4) + // time_mid
    '-' +
    hex(0x4000 | rand(12), 4) + // time_hi_and_version
    '-' +
    hex(0x8000 | rand(14), 4) + // clock_seq_hi_and_reserved clock_seq_low
    '-' +
    hex(rand(48), 12) // node
  );
}
