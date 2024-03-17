import { TeamType } from 'src/atoms';
import { ApplyInputCustomProps, ConfirmBoxProps } from 'src/components';

export const HANOWL_APPLY = {
  CONTENT_SUBTEXTS: [
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

  CONFIRM_DUMMY_LIST: [
    {
      team: '기능부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },
    {
      team: '도서부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },
    {
      team: '도서부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },
    {
      team: '도서부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },
    {
      team: '도서부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },
    {
      team: '도서부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },
    {
      team: '도서부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },
    {
      team: '도서부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },

    {
      team: '학예 체육부',
      date: '2021.09.01',
      introduce: '앙기모링 최근원 입니다~~~~~~~',
      motive: '앙기모링 최근원 입니다~~~~~~~',
      aspiration: '앙기모링 최근원 입니다~~~~~~~',
    },
  ] as ConfirmBoxProps[],

  URL: 'https://hanowl.com',

  START_DATE: '2024-03-21T00:00:00',
};
