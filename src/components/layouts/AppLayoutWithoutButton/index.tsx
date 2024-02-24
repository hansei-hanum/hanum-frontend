import { ViewProps } from 'react-native';

import { Text } from '../../common/Text';

import * as S from './styled';

export interface AppLayoutWithoutButtonCustomProps {
  headerText: string;
  subHeaderText?: React.ReactNode;
  children: React.ReactNode;
}

export type AppLayoutWithoutButtonProps = AppLayoutWithoutButtonCustomProps & ViewProps;

export const AppLayoutWithoutButton: React.FC<AppLayoutWithoutButtonProps> = ({
  headerText,
  subHeaderText,
  children,
  ...props
}) => {
  return (
    <S.AppLayoutWithoutButtonContainer {...props}>
      <S.AppLayoutWithoutButtonHeader>
        <Text size={26} fontFamily="bold">
          {headerText.split('\n').map((line, index) => (
            <Text size={26} fontFamily="bold" key={line}>
              {line}
              {index !== headerText.split('\n').length - 1 && '\n'}
            </Text>
          ))}
        </Text>
        {subHeaderText}
      </S.AppLayoutWithoutButtonHeader>
      {children}
    </S.AppLayoutWithoutButtonContainer>
  );
};
