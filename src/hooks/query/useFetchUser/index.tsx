import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { APIErrorResponse, APIResponse, FetchUserResponse, fetchUser } from 'src/api';
import { formattedDepartment } from 'src/utils';

export const useFetchUser = (): UseQueryResult<
  APIResponse<FetchUserResponse>,
  AxiosError<APIErrorResponse>
> => {
  return useQuery('useFetchUser', fetchUser, {
    onError: (error) => {
      console.log(error);
    },
    staleTime: 1000 * 60 * 60 * 24,
    retry: 0,
  });
};

export const useGetUser = () => {
  const { data, isLoading } = useFetchUser();
  const userData = data && data.data;
  const userLoading = isLoading;
  const verifyUser = userData && userData.verification;
  const type = verifyUser ? verifyUser.type : null;
  const classroom = verifyUser ? verifyUser.classroom : null;
  const grade = verifyUser ? verifyUser.grade : null;
  const department = verifyUser ? verifyUser.department : null;
  const number = verifyUser ? verifyUser.number : null;
  const graduated_at = verifyUser ? verifyUser.graduated_at : null;

  const formatUser = () => {
    switch (type) {
      case 'GRADUATED':
        return `${formattedDepartment(department)} ${graduated_at}년도 졸업생`;
      case 'STUDENT':
        return `${formattedDepartment(department)} ${grade}학년 ${classroom}반 ${number}번 재학생`;
      case 'TEACHER':
        return `한세사이버보안고등학교 교직원`;
    }
  };

  return {
    userData,
    userLoading,
    userProfile: userData?.profile,
    verifyUser,
    formatUser,
  };
};
