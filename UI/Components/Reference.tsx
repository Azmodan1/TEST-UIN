import styles from '../../styles/Reference.module.css';

const Reference: React.FC<{
  query: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<{ query: string }>>;
}> = ({ query, setSearchQuery }) => {

  let lastSymbol: any = null;
  const getLastSymbol = (num: string): string => {
    let res: number = 0;

    const arrNum: any = num.split('');
    for (let i = 1, j = 0; j < arrNum.length; i++, j++) {
      res += arrNum[j] * i;

      if (i == 10) {
        i = 0;
      }
    }

    res = res % 11;
    if (res == 10) {
      res = 0;
      for (let i = 3, j = 0; j < arrNum.length; i++, j++) {
        res += arrNum[j] * i;

        if (i == 10) {
          i = 0;
        }
      }
      res = res % 11;
      if (res == 10) {
        res = 0;
      }
    }

    return String(res);
  };
  if (query.length === 19 || query.length === 24) {
    lastSymbol = getLastSymbol(query);
  }
  return (
    <div
      className={styles.container}
      onClick={() =>
        setSearchQuery(prevState => ({
          ...prevState,
          query: prevState.query + lastSymbol,
        }))
      }
    >
      {query}
      {lastSymbol}
    </div>
  );
};

export default Reference;
