export const spreadArray = <T>(data?: T[][]): T[] => {
  const newArray: T[] = [];
  if (data) {
    for (const row of data) {
      if (row) {
        for (const innerData of row) {
          newArray.push(innerData);
        }
      }
    }
  }

  return newArray;
};
