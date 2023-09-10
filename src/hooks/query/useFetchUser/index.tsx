import { UseQueryResult, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, FetchUserResponse, fetchUser } from 'src/api';
import { userProfileState } from 'src/atoms';

export const useFetchUser = (): UseQueryResult<
  APIResponse<FetchUserResponse>,
  AxiosError<APIErrorResponse>
> => {
  const setProfile = useSetRecoilState(userProfileState);
  return useQuery('useFetchUser', fetchUser, {
    onSuccess: (data) => {
      if (data) {
        setProfile({
          created_at: data.data.created_at,
          id: data.data.id,
          name: data.data.name,
          phone: data.data.phone,
          profile: data.data.profile,
          verification: data.data.verification,
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
    staleTime: Infinity,
    retry: 0,
  });
};

export const useGetUser = () => {
  const useProfile = useRecoilValue(userProfileState);
  const verifyUser = useProfile.verification;
  const type = verifyUser ? verifyUser.type : null;
  const classroom = verifyUser ? verifyUser.classroom : null;
  const grade = verifyUser ? verifyUser.grade : null;
  const department = verifyUser ? verifyUser.department : null;
  const number = verifyUser ? verifyUser.number : null;
  const graduated_at = verifyUser ? verifyUser.graduated_at : null;

  const formattedDepartment = (department: null | string) => {
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
    userData: useProfile,
    userProfile: useProfile.profile,
    verifyUser,
    formatUser,
  };
};
