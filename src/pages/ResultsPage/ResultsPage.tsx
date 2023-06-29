import { GridLoader } from 'react-spinners';
import { getResults } from '../../firebase';
import S from './ResultsPage.module.css';
import { useEffect, useState } from 'react';
import formatData from '../../utils/formatData';

export interface IResults {
  attempts: string[];
  attemptsColors: string[];
  date: string;
  name: string;
  photoURL: string;
  uid: string;
}

export const ResultsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IResults[]>([]);

  useEffect(() => {
    if (!isLoading) {
      const date = formatData('date', Date.now());
      const att = async () => {
        if (date) {
          setIsLoading(true);
          const res = await getResults(date);
          if (res) {
            const newRes = res
              .filter((result) => result.attemptsColors.includes('+++++'))
              .sort((a, b) => a.attempts.length - b.attempts.length);
            setResults(newRes);
            setIsLoading(false);
          }
        }
      };
      att();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={S.main}>
      {isLoading ? (
        <GridLoader color="#fedd2c" />
      ) : (
        <section className={S.results}>
          {results.map((result, index) => (
            <div
              className={S.row}
              key={index}
              title={result.attempts.toString()}
            >
              <div className={S.image}>
                <div className={S.position}>
                  {index < 3 ? (
                    <img
                      src={`./${index + 1}.png`}
                      alt={(index + 1).toString()}
                    />
                  ) : (
                    <div>{index + 1}</div>
                  )}
                </div>
                <img
                  src={result.photoURL}
                  alt={result.photoURL[0]}
                  className={S.photo}
                />
              </div>
              <div className={S.name}>{result.name}</div>
              <div className={S.attempts}>{result.attempts.length}</div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};
