import { formattedPhone } from 'src/utils';

export interface UserInfoItem {
  title: string;
  fields: { title: string; value?: string }[];
}

export interface UserInfoProps {
  phone: string;
  verifyType?: '졸업생' | '재학생' | '교직원';
  endDate: string | null;
}

export const USER_INFO_LIST = ({ phone, verifyType, endDate }: UserInfoProps): UserInfoItem[] => {
  const info_list = [
    {
      title: '기본 정보',
      fields: [
        {
          title: '전화번호',
          value: formattedPhone(phone),
        },
      ],
    },
    {
      title: '인증 정보',
      fields: [
        {
          title: '분류',
          value: verifyType,
        },
        {
          title: '유효기간',
          value: endDate ? endDate : '없음',
        },
      ],
    },
  ];

  return info_list;
};
