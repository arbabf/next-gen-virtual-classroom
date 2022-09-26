import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/pages/Home.module.css';
import ScreenContainer from '../components/screen/screencontainer/ScreenContainer';
import ButtonSet from '../components/common/buttonset/buttonset';
import Button from '../components/common/button/button';
import { connect, debug_setClientIdTo1, getAllProducers, createRoom, joinRoom, leaveRoom, getMicrophone, publish } from '../entities/user/connect';

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
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<div>PLACEHOLDER TEXT</div>
				<ButtonSet>
					<Button onClick={connect}>
							<span>{'Connect'}</span>
					</Button>
					<Button onClick={createRoom}>
							<span>{'Create Room'}</span>
					</Button>
					<Button onClick={joinRoom}>
							<span>{'Join Room'}</span>
					</Button>
					<Button onClick={leaveRoom}>
							<span>{'Leave Room'}</span>
					</Button>
					<Button onClick={getMicrophone}>
							<span>{'Share microphone'}</span>
					</Button>
					<Button onClick={(_) => publish("cam")}>
							<span>{'Share camera'}</span>
					</Button>
					<Button onClick={(_) => publish("scrn")}>
							<span>{'Share screen'}</span>
					</Button>
					<Button onClick={getAllProducers}>
							<span>{'Subscribe'}</span>
					</Button>
					<Button onClick={debug_setClientIdTo1}>
							<span>{'Client ID Debug'}</span>
					</Button>
				</ButtonSet>
				<form>
                    <label htmlFor="roomId">Room ID: </label>
                    <input type="text" id="roomId" name="roomId" className="border"/>
                </form>
				<div id="remoteVideoSection"></div>
			</main>
		</>
	);
};

export default Home;
