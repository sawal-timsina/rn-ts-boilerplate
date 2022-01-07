export const limitCharacters = (str: string, limit: number) =>
  str.length > limit ? `${str.substring(0, limit)}...` : str;
