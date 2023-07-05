import S from '../components/GameField.module.css'

const getLetterClassName = (attemptsColors: string, index: number) => {
  if (attemptsColors[index] === '+') {
    return `${S.letter} ${S.green}`
  } else if (attemptsColors[index] === '?') {
    return `${S.letter} ${S.yellow}`
  } if (attemptsColors[index] === '-') {
    return `${S.letter} ${S.black}`
  }
};

export default getLetterClassName