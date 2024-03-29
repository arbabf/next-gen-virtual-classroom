import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/pages/Home.module.css';
import ScreenContainer from '../components/screen/screencontainer/ScreenContainer';
import ButtonSet from '../components/common/buttonset/buttonset';
import Button from '../components/common/button/button';
import { connect, getAllProducers, createRoom, joinRoom, leaveRoom, publish } from '../lib/connect';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Screen test - NGVC</title>
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
					<Button onClick={connect} className='connect'>
						<span>{'Connect'}</span>
					</Button>
					<Button onClick={createRoom} className='create'>
						<span>{'Create Room'}</span>
					</Button>
					<Button onClick={joinRoom} className='join'>
						<span>{'Join Room'}</span>
					</Button>
					<Button onClick={leaveRoom} className='leave'>
						<span>{'Leave Room'}</span>
					</Button>
					<Button onClick={() => publish("cam")} className='camera'>
						<span>{'Share camera and microphone'}</span>
					</Button>
					<Button onClick={() => publish("scrn")} className='screen'>
						<span>{'Share screen'}</span>
					</Button>
					<Button onClick={getAllProducers} className='subscribe'>
						<span>{'Subscribe'}</span>
					</Button>
				</ButtonSet>
				<form>
					<label htmlFor="roomId">Room ID: </label>
					<input type="text" id="roomId" name="roomId" className="border" />
				</form>
				<div id="remoteVideoSection"></div>
			</main>
		</>
	);
};

export default Home;
