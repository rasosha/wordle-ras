import { ColorSets } from '../types';
import S from '../components/Keyboard.module.css'

const getKeyClassName = (charColors: ColorSets, char: string) => {
  if (charColors.greenSet.has(char)) {
    return `${S.char} ${S.green}`;
  } else if (charColors.yellowSet.has(char)) {
    return `${S.char} ${S.yellow}`;
  } else if (charColors.blackSet.has(char)) {
    return `${S.char} ${S.black}`;
  } else {
    return `${S.char}`;
  }
};

export default getKeyClassName