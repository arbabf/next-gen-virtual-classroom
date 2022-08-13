import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/pages/Home.module.css';

const Home: NextPage = () => {
	return (
		<>
			<main className={styles.main}>
				Edit your profile
			</main>
		</>
	);

}

export default Home;