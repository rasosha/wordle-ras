import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';

interface SpanProps {
  bg: string;
  color?: string;
}

const Colored = styled.span<SpanProps>`
  background-color: ${(props) => props.bg};
  padding: 2px 6px;
  line-height: 32px;
  color: ${(props) => props.color || '#000'};
`;

const Li = styled.li`
  list-style: circle;
  margin: 12px;
  font-size: 18px;
`;

export const WelcomePage = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: { xs: 'start', sm: 'start', md: 'center' },
      padding: { xs: '6px', sm: '12px', md: '24px' },
      gap: '12px',
      maxWidth: '600px',
    }}
  >
    <Typography
      variant="h5"
      component="p"
      mt={3}
    >
      Правила игры:
    </Typography>
    <ol>
      <Li>
        <p>В начале игры появляется поле, состоящее из 30 клеток: по пять штук в строчках и по шесть штук в столбцах.</p>
      </Li>
      <Li>
        <p>
          В это поле можно вписать шесть слов, состоящих из пяти букв. Принимаются только существительные в единственном числе.
        </p>
      </Li>
      <Li>
        <p>Ниже клавиатура на которой показывается статус букв.</p>
      </Li>
      <Li>
        <p>
          Введите любое слово, как например слово «океан», нажмите на кнопку <Colored bg={'#FEDD2C'}>✓</Colored>, и буквы
          поменяют цвет.
        </p>
      </Li>
      <Li>
        <p>
          <Colored bg={'#FEDD2C'}> Жёлтый цвет</Colored>— буква на своем месте.
        </p>
      </Li>
      <Li>
        <p>
          <Colored bg={'#FFFFFF'}> Белый цвет</Colored> — буква есть в слове, но в другом месте.
        </p>
      </Li>
      <Li>
        <p>
          <Colored
            bg={'#5F5F5F'}
            color="#FFFFFF"
          >
            Серый цвет
          </Colored>
          — буквы в слове нет.
        </p>
      </Li>
    </ol>
    <NavLink to={'game'}>
      <Button variant="contained">Играть</Button>
    </NavLink>
  </Box>
);
