import { TouchableOpacity } from 'react-native';

import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const PostCommentCardContainer = styled.View`
  flex-direction: row;
  column-gap: 6px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 14px;
`;

export const PostCommentCardImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
`;

export const PostCommentImage = styled.Image`
  border-radius: 16px;
  width: 140px;
  height: 140px;
`;

export const PostCommentCardCommentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2px;
`;

export const PostCommentCardCommentInnerContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 2px;
`;

export const PostCommentCardIconContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 4px;
`;

export const PostCommentCardComment = styled.Text`
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.default};
`;

export const PostCommentImageWrapper = styled(TouchableOpacity)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PostDetailLayoutContainer = styled.View`
  flex: 1;
  row-gap: 24px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const PostDetailLayoutReplyContainer = styled.View`
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`;

export const AuthorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
`;
