export const formattedMoney = (money: string) => {
  if (money.length < 4) return money;
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
