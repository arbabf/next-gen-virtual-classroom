import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/pages/Home.module.css';
import ScreenContainer from '../components/screen/screencontainer/ScreenContainer';
import ButtonSet from '../components/common/buttonset/buttonset';
import Button from '../components/common/button/button';
import { connect, getScreenShareWithMicrophone, subscribe, createRoom } from '../entities/user/connect';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>NGVC</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<ScreenContainer />
				<ButtonSet>
					<Button onClick={connect}>
							<span>{'Connect'}</span>
					</Button>
					<Button onClick={createRoom}>
							<span>{'Create Room'}</span>
					</Button>
					<Button onClick={subscribe}>
							<span>{'Subscribe'}</span>
					</Button>
					<Button onClick={getScreenShareWithMicrophone}>
							<span>{'Share your audio/video'}</span>
					</Button>
				</ButtonSet>
			</main>
		</>
	);
};

export default Home;
