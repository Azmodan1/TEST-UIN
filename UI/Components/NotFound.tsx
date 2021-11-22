import { useMemo } from 'react';

import Image from 'next/image';
import Logo from '../../styles/images/error.svg';
import styles from '../../styles/NotFound.module.css';

const NotFound: React.FC<{ query: string }> = ({ query }) => {
  const queryName = useMemo(() => query, []);
  return (
    <div className={styles.container}>
      <Image src={Logo} alt="icon" width="92" height="92" />
      <p> Штраф {queryName} не найден</p>
    </div>
  );
};

export default NotFound;
