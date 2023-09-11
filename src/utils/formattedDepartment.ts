export const formattedDepartment = (department: null | string) => {
  switch (department) {
    case 'CLOUD_SECURITY':
      return '클라우드보안과';
    case 'NETWORK_SECURITY':
      return '네트워크보안과';
    case 'METAVERSE_GAME':
      return '메타버스게임과';
    case 'GAME':
      return '게임과';
  }
};
