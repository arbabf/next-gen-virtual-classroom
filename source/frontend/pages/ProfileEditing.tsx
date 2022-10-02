import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/pages/Home.module.css';
import {UserView} from '../components/user/UserView'
import {testRoomUser} from '../entities/TestEntities'


const Home: NextPage = () => {
	return (
		<>			
			<Head>
				<title>NGVC</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<UserView user={testRoomUser} loggedInUser={testRoomUser}/>
			</main>
			<div>
				
			</div>
	

		</>
	);
};

export default Home;
