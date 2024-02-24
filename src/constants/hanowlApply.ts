import { TeamType } from 'src/atoms';
import { ApplyInputCustomProps } from 'src/components';

export const HANOWL_APPLY = {
  APPLY_DETAIL_SUBTEXTS: [
    '작성하시는 내용은 자동으로 임시저장돼요.',
    '고민이 더 필요하다면 이 창을 닫고 해도 괜찮아요.',
    '그래도 나중에 이어서 작성할 수 있어요.',
  ] as string[],

  TEAMS: [
    '기능부',
    '방송부',
    '안전부',
    '행사 기획부',
    '홍보부',
    '총무부',
    '학예 체육부',
    '도서부',
  ] as TeamType[],

  DETAIL_CONTENTS: [
    {
      placeholder: '자기소개를 입력해주세요',
      height: 250,
    },
    {
      placeholder: '지원 동기를 입력해주세요',
      height: 250,
    },
    {
      placeholder: '포부를 입력해주세요',
      height: 125,
    },
  ] as ApplyInputCustomProps[],
};
