import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    default: string;
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
    selectBox: string;
    vote: {
      notSelect: string;
    };
    modalBg: string;
    tabBarBg: string;
    backDrop: string;
    primaryLinear: string[];
  }
}
