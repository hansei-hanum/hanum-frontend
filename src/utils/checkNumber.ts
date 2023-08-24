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
