export const formattedMoney = (money: string) => {
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
