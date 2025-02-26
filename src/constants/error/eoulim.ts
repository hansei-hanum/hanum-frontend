export const eoulimVoteErrorMessage: { [key: string]: string } = {
  VOTE_TABLE_NOT_FOUND: '진행중인 투표가 없습니다.',
  VOTE_FIELD_NOT_FOUND: '투표 필드가 없습니다.',
  ALREADY_VOTED: '이미 투표했습니다.',
};

export const eoulimLuckDrawErrorMessage: { [key: string]: string } = {
  NOT_STARTED_YET: '아직 추첨번호를 발급받을 수 없습니다. 공연 시작 후 다시 시도해주세요.',
  USER_NOT_FOUND: '사용자 정보를 찾을 수 없습니다.',
  NOT_ALLOWED: '인증하지 않았거나 사용할 권한이 없는 유저입니다.',
  USER_ALREADY_HAS_LUCKY_NUMBER: '이미 추첨번호를 받았습니다.',
  TOKEN_NOT_FOUND: '유효하지 않은 QR 코드입니다.',
  TOKEN_ALREADY_USED: '누군가 이미 이 QR 코드로 추첨번호를 받았습니다.',
};

export const eoullimGetLuckDrawErrorMessage: { [key: string]: string } = {
  USER_NOT_FOUND: '사용자 정보를 찾을 수 없습니다.',
  NOT_ALLOWED: '인증하지 않았거나 사용할 권한이 없는 유저입니다.',
  USER_HAS_NO_LUCKY_NUMBER: '추첨번호를 받지 않았습니다.',
};
