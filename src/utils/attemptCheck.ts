const attemptCheck = (attempt: string, answer: string) => {
  const attemptArr = attempt.split('')
  const answerArr = answer.split('')
  const green = [];
  const yellow = [];
  const black = [];


  const result = []

  for (let i = 0; i < 5; i++) {
    if (attemptArr[i] === answerArr[i]) {
      result.push('+')
      green.push(attemptArr[i])
      answerArr[i] = '*'
      attemptArr[i] = '!'
    } else {
      result.push('-')
      black.push(attemptArr[i])
    }
  }

  for (let i = 0; i < 5; i++) {
    if (answerArr.includes(attemptArr[i])) {
      if (attemptArr[i] === answerArr[i]) {
        continue
      } else {
        result[i] = '?'
        yellow.push(attemptArr[i])
        answerArr[answerArr.indexOf(attemptArr[i])] = '*'
      }

    }
  }

  return {
    colors: {
      green,
      yellow,
      black,
    },
    attempt: {
      'word': attempt,
      'check': result,
    }
  }
}

export default attemptCheck