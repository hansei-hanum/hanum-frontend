export const checkNumber = (text: string) => {
  let newText = '';
  const numbers = '0123456789';
  for (let i = 0; i < text.length; i++) {
    if (numbers.indexOf(text[i]) > -1) {
      newText = newText + text[i];
    } else {
      newText = newText.replace(text[i], '');
    }
  }
  return newText;
};

export const checkString = (text: string) => {
  let newText = '';
  const numbers = '0123456789';
  for (let i = 0; i < text.length; i++) {
    if (numbers.indexOf(text[i]) < 0) {
      newText = newText + text[i];
    } else {
      newText = newText.replace(text[i], '');
    }
  }
  return newText;
};

export type InputType = 'string' | 'number';

export const checkType = (inputType: 'string' | 'number') => {
  switch (inputType) {
    case 'string':
      return checkString;
    case 'number':
      return checkNumber;
  }
};
