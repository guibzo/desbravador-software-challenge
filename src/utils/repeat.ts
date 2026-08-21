export const repeat = <T>(length: number, mapper: (index: number) => T): T[] => {
  return Array.from({ length }, (_, index) => mapper(index))
}
