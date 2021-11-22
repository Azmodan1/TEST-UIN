import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { pick } from 'ramda';

import styles from '../styles/Home.module.css';
import Logo from '../styles/images/icon.png';
import Fine from '../UI/Components/Fine';
import { Ifine } from './../Interfaces/fine';
import Loader from '../UI/Components/Loader';
import NotFound from './../UI/Components/NotFound';
import Reference from './../UI/Components/Reference';

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState({
    query: '',
  });
  const [fine, setFine] = useState<Ifine | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [notValid, setNotValid] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.query.length === 20 || searchQuery.query.length === 25) {
      setNotValid(false);
    } else setNotValid(true);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({ query: e.target.value.trim() });
  };

  const getData = async () => {
    router.push(`/?search=${searchQuery.query}`);
    const res = await fetch(
      `https://test-task.shtrafovnet.com/fines/${searchQuery.query}`
    );
    setError(false);
    setFine(null);
    setLoading(true);
    if (res.status === 200) {
      const data = await res.json();
      const filteredData = pick<Ifine, any>(
        [
          'doc_number',
          'bill_at',
          'koap_code',
          'payee_username',
          'payee_inn',
          'payee_kpp',
          'payee_bank_account',
          'payee_bank_name',
          'payee_bank_bik',
          'payee_oktmo',
          'kbk',
          'amount',
          'amount_to_pay',
        ],
        data
      );
      setFine(filteredData);
    } else setError(true);

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Штрафов НЕТ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;800&family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main className={styles.main}>
        <div className={styles.logo}>
          <Image src={Logo} alt="icon" width="34" height="34" />
          <h1>
            ШТРАФОВ <small> НЕТ</small>
          </h1>
        </div>
        <p> Получение информации о штрафе по УИН</p>
        <div>
          {notValid && searchQuery.query && (
            <h5>
              Длина УИН должна быть 20 или 25 символов, сейчас введено &nbsp;
              {searchQuery.query.length}
            </h5>
          )}
          <input
            value={searchQuery.query}
            onChange={handleChange}
            placeholder="Введите УИН"
            minLength={20 || 25}
          />
          <button onClick={getData}> Найти </button>
          {(searchQuery.query.length == 19 && (
            <Reference
              query={searchQuery.query}
              setSearchQuery={setSearchQuery}
            />
          )) ||
            (searchQuery.query.length == 24 && (
              <Reference
                query={searchQuery.query}
                setSearchQuery={setSearchQuery}
              />
            ))}
        </div>
        {loading && <Loader />}
        {fine && <Fine fine={fine} query={searchQuery.query} />}
        {error && <NotFound query={searchQuery.query} />}
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query?.search) {
    const res = await fetch(
      `https://test-task.shtrafovnet.com/fines/${query.search}`
    );
    if (res.status === 200) {
      const resJson = await res.json();

      return {
        props: { resJson },
      };
    } else
      return {
        props: {},
      };
  }
  return {
    props: {},
  };
};
