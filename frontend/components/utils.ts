export const ONE_NEAR_IN_YOCTO = 1000000000000000000000000;

export const NANOSEC_DIA = 86400000000000;

export function toDay_from_nano(start: string, end: string): string {
  return ((parseInt(end) - parseInt(start)) / NANOSEC_DIA).toFixed();
}

export function toNEAR(value: string): string {
  return (parseFloat(value) / ONE_NEAR_IN_YOCTO).toFixed(2);
}

export function toYocto(value: string): number {
  return parseFloat(value) * ONE_NEAR_IN_YOCTO;
}

export function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
}
