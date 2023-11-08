import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    white: string;
    black: string;
    primary: string;
    secondary: string;
    placeholder: string;
    danger: string;
    lightGray: string;
    background: string;
    green: string;
    brown: string;
    codeInput: string;
    shadow: {
      Ios: string;
      Android: string;
    };
    vote: {
      background: string;
      notSelect: string;
    };
  }
}
