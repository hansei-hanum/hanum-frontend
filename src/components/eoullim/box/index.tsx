import React from 'react';

import { useNavigate } from 'src/hooks';
import { Icon, ScaleOpacity } from 'src/components';

import * as S from './styled';

export interface EoullimBoxProps {
  title: string;
  icon: string;
  navigateUrl: string;
  isBig?: boolean;
}

export const EoullimBox: React.FC<EoullimBoxProps> = ({ title, icon, navigateUrl, isBig }) => {
  const navigate = useNavigate();

  return (
    <ScaleOpacity onPress={() => navigate(navigateUrl)} style={{ width: isBig ? '100%' : '48%' }}>
      <S.EoullimBox blurType="light" blurAmount={1} reducedTransparencyFallbackColor="white" />
      <S.EoullimBoxTextContainer>
        <Icon size={60} icon={icon} includeBackground={false} />
        <S.EoullimBoxText>{title}</S.EoullimBoxText>
      </S.EoullimBoxTextContainer>
    </ScaleOpacity>
  );
};
