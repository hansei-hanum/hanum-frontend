import { useTheme } from '@emotion/react';

import { GetCommentsContentsProps, RichTextType } from 'src/api';
import { Text } from 'src/components/common';

export interface FormattedContentProps extends GetCommentsContentsProps {
  withPrimaryText?: boolean;
}

export const FormattedContent: React.FC<FormattedContentProps> = ({ spans, withPrimaryText }) => {
  const theme = useTheme();
  if (!spans) return null;

  return (
    <>
      {spans.map((spanProps, index) => {
        if (spanProps.type === RichTextType.TEXT) {
          if (spanProps.text.includes('\n')) {
            return spanProps.text.split('\n').map((line, index) => (
              <>
                {line}
                {index !== spanProps.text.split('\n').length - 1 && '\n'}
              </>
            ));
          }
          return spanProps.text;
        } else if (spanProps.type === RichTextType.MENTION) {
          return withPrimaryText ? (
            <Text size={15} key={index} color={theme.primary}>
              @{spanProps.mention.toString()}
            </Text>
          ) : (
            <>@{spanProps.mention.toString()}</>
          );
        }
      })}
    </>
  );
};
