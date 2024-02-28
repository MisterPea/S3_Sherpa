export default function createId (length: number = 9): string {
  return Math.random().toString(36).replace(/[^0-9a-z]+/g, '').substring(0, length);
}
