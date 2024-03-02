import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const PostCommentCardContainer = styled.View`
  flex-direction: row;
  column-gap: 6px;
  width: 100%;
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
  flex-wrap: wrap;
  gap: 2px;
`;

export const PostCommentCardComment = styled.Text`
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.default};
`;
