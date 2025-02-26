import { formattedDepartment } from 'src/utils';

import { useFetchUser } from './query';

export const useGetUser = () => {
  const { data, isLoading } = useFetchUser();

  const userProfile = data?.data;
  const verifyUser = userProfile?.verification;
  const type = verifyUser?.type;
  const classroom = verifyUser?.classroom;
  const grade = verifyUser?.grade;
  const department = verifyUser ? verifyUser.department : null;
  const graduated_at = verifyUser?.graduated_at;

  const formatUser = () => {
    switch (type) {
      case 'GRADUATED':
        return `${formattedDepartment(department)} ${graduated_at}년도 졸업생`;
      case 'STUDENT':
        return `${formattedDepartment(department)} ${grade}학년 ${classroom}반 재학생`;
      case 'TEACHER':
        return `한세사이버보안고등학교 교직원`;
    }
  };

  const userType = () => {
    switch (type) {
      case 'GRADUATED':
        return '졸업생';
      case 'STUDENT':
        return '재학생';
      case 'TEACHER':
        return '교직원';
    }
  };

  return {
    isLoading,
    userData: userProfile,
    userProfile: userProfile?.profile,
    classroom,
    grade,
    department: formattedDepartment(department),
    verifyUser,
    formatUser,
    userType,
  };
};
