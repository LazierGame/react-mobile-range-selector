// export function generateUUID() {
//   return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
//     (c ^ (crypto.getRandomValues(new Uint32Array(1))[0] & (15 >> (c / 4)))).toString(16)
//   );
// }
//

const dec2hex: string[] = [];

for (let i=0; i<=15; i++) {
  dec2hex[i] = i.toString(16);
}

export function generateUUID(): string {
  let uuid: string = '';
  for (let i=1; i<=36; i++) {
    if (i===9 || i===14 || i===19 || i===24) {
      uuid += '-';
    } else if (i===15) {
      uuid += 4;
    } else if (i===20) {
      uuid += dec2hex[(Math.random()*4|0 + 8)];
    } else {
      uuid += dec2hex[(Math.random()*16|0)];
    }
  }
  return uuid;
}
