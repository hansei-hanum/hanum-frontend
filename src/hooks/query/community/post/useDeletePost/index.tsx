import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';

import { useNavigation, useRoute } from '@react-navigation/native';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { APIErrorResponse, APIResponse, DeletePostValues, deletePost } from 'src/api';
import { ErrorToast } from 'src/constants';
import { communityEditAtom } from 'src/atoms';

export const useDeletePost = (): UseMutationResult<
  APIResponse<null>,
  AxiosError<APIErrorResponse>,
  DeletePostValues
> => {
  const queryClient = useQueryClient();
  const route = useRoute();
  const navigation = useNavigation();

  const setCommunityEdit = useSetRecoilState(communityEditAtom);

  return useMutation('useDeletePost', deletePost, {
    onSuccess: () => {
      setCommunityEdit({ text: '', images: [], id: null });
      route.name === 'CommunityPostDetail' ? navigation.goBack() : null;
      queryClient.invalidateQueries({ queryKey: ['useGetPosts'] });
      queryClient.invalidateQueries({ queryKey: ['useGetMyPosts'] });
      Toast.show({
        type: 'success',
        text1: '게시글이 성공적으로 삭제되었어요',
      });
    },
    onError: (error) => {
      console.log(error.response?.data, 'onError');
      const message = error.response?.data.message;
      ErrorToast(message ?? '알 수 없는 오류가 발생했어요');
    },
  });
};
