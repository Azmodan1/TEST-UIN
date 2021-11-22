import { useMemo } from 'react';
import { isNil } from 'ramda';

import styles from '../../styles/Fine.module.css';
import { Ifine } from './../../Interfaces/fine';

const Fine: React.FC<{ fine: Ifine | null; query: string | null }> = ({
  fine,
  query,
}) => {

  const queryName = useMemo(() => query, [fine]);
  
  function getTitleNames() {
    const names: string[] = [
      'Cвидетельства о регистрации',
      'Дата постановления',
      'Нарушение',
      'Получатель платежа',
      'ИНН',
      'КПП',
      'Расчетный счет',
      'Банк получателя',
      'БИК',
      'ОКТМО(ОКАТО)',
      'КБК',
      'Сумма штрафа',
      'К оплате',
    ];

    let count: number = 0;
    let res: string = '';
    return function () {
      res = names[count];
      count++;
      return res;
    };
  }

  const titleName = getTitleNames();
  const dataToRender = !isNil(fine)
    ? Object.entries(fine).map(([title, value]) => {
        title = titleName();
        if (/\d{4}.\d{1,2}.\d{1,2}/g.test(value)) {
          const filteredDate = value.match(/^\d{4}.\d{1,2}.\d{1,2}/g);
          if (filteredDate) {
            value = filteredDate[0];
          }
        }

        if (value === null) {
          value = 'Данные отсутствуют';
        }

        return {
          title,
          value,
        };
      })
    : null;
  return (
    <div className={styles.container}>
      <h1> Постановление #{queryName}</h1>
      {!isNil(fine) &&
        dataToRender!.map((item, index) => (
          <li key={index}>
            {item.title}: <span>{item.value} </span>
          </li>
        ))}
    </div>
  );
};

export default Fine;
