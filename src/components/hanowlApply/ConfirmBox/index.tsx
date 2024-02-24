import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import { ScaleOpacity, Text } from 'src/components/common';
import { HanowlApplyAtomProps, hanowlApplyAtom } from 'src/atoms';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export interface ConfirmBoxProps extends HanowlApplyAtomProps {
  date: string;
}

export const ConfirmBox: React.FC<ConfirmBoxProps> = ({
  team,
  date,
  introduce,
  motive,
  aspiration,
}) => {
  const navigate = useNavigate();
  const setHanowlApply = useSetRecoilState(hanowlApplyAtom);

  const theme = useTheme();

  const onBoxPress = () => {
    setHanowlApply({
      team,
      introduce,
      motive,
      aspiration,
    });
    navigate('SelectTeam');
  };

  return (
    <ScaleOpacity onPress={onBoxPress}>
      <S.ConfirmBox>
        <S.ConfirmBoxTextContainer>
          <Text size={18}>{team} 지원서</Text>
          <Text size={12}>(마지막 수정 {date})</Text>
        </S.ConfirmBoxTextContainer>
        <MaterialIcons name="chevron-right" size={30} color={theme.placeholder} />
      </S.ConfirmBox>
    </ScaleOpacity>
  );
};
