export interface AnonymityOptionItems {
  title: '실명 표시' | '익명으로 표시' | '닉네임 사용';
  description: string;
  icon: string;
}

export const ANONYMITY_OPTION_LIST: AnonymityOptionItems[] = [
  {
    title: '실명 표시',
    description: '자신의 이름과 프로필 사진을 사용합니다.',
    icon: '🌎',
  },
  {
    title: '익명으로 표시',
    description:
      '자신의 이름과 프로필 사진을 숨깁니다.\n어떤 사용자도 작성자가 누군지 볼 수 없습니다.',
    icon: '🔒',
  },
  {
    title: '닉네임 사용',
    description: '일회용 닉네임을 사용합니다.\n닉네임 외에 어떠한 정보도 표시되지 않습니다.',
    icon: '🎭',
  },
];
