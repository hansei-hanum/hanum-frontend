import { TeamType } from 'src/atoms';
import { ApplyInputCustomProps } from 'src/components';

export const HANOWL_APPLY = {
  CONTENT_SUBTEXTS: [
    '각 섹션별 글자는 최소 10자 ~ 최대 5000자까지 입력 가능해요.',
    '최소 글자를 맞추지 못하면 지원서를 제출할 수 없어요.',
    '최대 글자를 넘기게되면 초과된 글자는 삭제돼요.',
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

  CONTENTS: [
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

  FINAL_CONFIRM_SUBTEXTS: [
    '지원서를 제출하면 추가 제출이나 수정이 불가해요.',
    '또한, 여러 부서에 중복 지원도 불가해요.',
    '작성하신 내용이 맞는지 다시 확인해 주세요.',
  ] as string[],

  URL: 'https://recruit.hanum.us/',

  START_DATE: '2024-03-20T09:00:00',
};
