export const dateFormat = (date: string) => {
  const _date = new Date(date);
  return `${_date.getFullYear()}/${("0" + (_date.getMonth() + 1)).slice(-2)}/${(
    "0" + _date.getDate()
  ).slice(-2)}`;
};
