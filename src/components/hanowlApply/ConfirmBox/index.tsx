import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import { ScaleOpacity, Text } from 'src/components/common';
import { TeamType, hanowlApplyAtom } from 'src/atoms';
import { useNavigate } from 'src/hooks';
import { GetTemporaryApplicationResponse } from 'src/api/hanowlApply';
import { getPrevTimeString } from 'src/utils';

import * as S from './styled';

export interface ConfirmBoxProps extends GetTemporaryApplicationResponse {}

export const ConfirmBox: React.FC<ConfirmBoxProps> = ({
  department,
  id,
  introduction,
  motivation,
  updated_at,
  aspiration,
}) => {
  const navigate = useNavigate();
  const setHanowlApply = useSetRecoilState(hanowlApplyAtom);

  const theme = useTheme();

  const onBoxPress = () => {
    setHanowlApply({
      id,
      team: department.name as TeamType,
      introduce: introduction,
      motive: motivation,
      aspiration,
    });
    navigate('HanowlSelectTeam');
  };

  return (
    <ScaleOpacity onPress={onBoxPress}>
      <S.ConfirmBox>
        <S.ConfirmBoxTextContainer>
          <Text size={18}>{department.name} 지원서</Text>
          <Text size={12}>(마지막 수정 {getPrevTimeString(updated_at)})</Text>
        </S.ConfirmBoxTextContainer>
        <MaterialIcons name="chevron-right" size={30} color={theme.placeholder} />
      </S.ConfirmBox>
    </ScaleOpacity>
  );
};
