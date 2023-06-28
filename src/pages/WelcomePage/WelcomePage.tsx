import { NavLink } from 'react-router-dom';
import S from './WelcomePage.module.css';

export const WelcomePage = () => {
  return (
    <section className={S.main}>
      <p className={S.h}>Правила игры:</p>
      <ul className={S.rules}>
        <li>
          <p>В начале игры появляется поле, состоящее из 30 клеток, по пять штук в строчках и по шесть штук в столбцах.</p>
        </li>
        <li>
          <p>
            В это поле можно вписать шесть слов, состоящих из пяти букв. Принимаются только существительные в единственнем
            числе.
          </p>
        </li>
        <li>
          <p>Ниже клавиатура на которой показывается статус букв.</p>
        </li>
        <li>
          <p>Начинайте вводить любое слово, как например слово «океан», нажмите на кнопку Ввод и буквы поменяют цвет.</p>
        </li>
        <li>
          <p>
            <span className={S.green}>Жёлтый цвет</span> — буква на своем месте.
          </p>
          <p>
            <span className={S.yellow}>Белый цвет</span> — буква есть в слове но в другом месте.
          </p>
          <p>
            <span className={S.black}>Серый цвет</span> — буквы в слове нет
          </p>
        </li>
      </ul>
      <NavLink to={'main'}>
        <button className={S.button}>Играть</button>
      </NavLink>
    </section>
  );
};
