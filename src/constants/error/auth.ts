export const AUTH_ERROR_MESSAGE =
  '알 수 없는 문제가 발생했어요.\n문제가 지속되면 문의하기를 통해 문의해주세요.';

export const authErrorMessage: { [key: string]: string } = {
  ALREADY_REGISTERED: '이미 가입되어 있어요. 로그인을 해주세요.',
  INVALID_VERIFICATION_CODE: '인증번호가 잘못되었어요',
  RATE_LIMITED: '요청이 너무 빨라요. 잠시 후에 다시 시도해주세요.',
  ACCOUNT_SUSPENDED:
    '이용약관 위반으로 이용제한 조치된 계정이에요.\n자세한 사항은 문의하기를 통해 문의해주세요.',
  USER_NOT_FOUND: '가입 이력이 없어요. 회원가입을 진행해주세요.',
};

export const authPhoneErrorMessage: { [key: string]: string } = {
  RATE_LIMITED: '요청이 너무 빨라요. 잠시 후에 다시 시도해주세요.',
  EXTERNAL_API_EXCEPTION:
    '내부 오류로 인해 인증번호를 보낼 수 없어요.\n문제가 지속되면 문의하기를 통해 문의해주세요.',
};

export const authUserVerifyErrorMessage: { [key: string]: string } = {
  UNAUTHORIZED: '로그인 토큰이 만료되었거나, 존재하지 않아요.',
  KEY_NOT_FOUND: '인증 코드가 잘못되었어요',
};
