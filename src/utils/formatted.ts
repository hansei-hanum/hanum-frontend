export const formattedMoney = (money: string) => {
  if (money.length < 4) return money;
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formattedDepartment = (department: null | string) => {
  switch (department) {
    case 'CLOUD_SECURITY':
      return '클라우드보안과';
    case 'NETWORK_SECURITY':
      return '네트워크보안과';
    case 'METAVERSE_GAME':
      return '메타버스게임과';
    case 'HACKING_SECURITY':
      return '해킹보안과';
    case 'GAME':
      return '게임과';
  }
};

export const formattedPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};
