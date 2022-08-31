import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/pages/Home.module.css';
import { TableContainer } from '../components/tables/TableContainer';
import { testTableState } from '../entities/TestEntities';
//import TableContainer from

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>NGVC</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1>This is table page.</h1>
			</main>

			<main className={styles.main}>
				<TableContainer tables={[testTableState]} />
			</main>
		</>
	);
};

export default Home;
