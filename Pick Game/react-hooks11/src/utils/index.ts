export function delay(time = 3000) {
  return new Promise(res => setTimeout(() => res(20), time));
}
