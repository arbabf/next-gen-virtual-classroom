import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Button from '../components/common/button/button';
import ButtonSet from '../components/common/buttonset/buttonset';
import Card from '../components/common/card/card';
import Navbar from '../components/navigation/navbar/navbar';
import Panel from '../components/common/panel/panel';
import styles from '../styles/pages/Home.module.css';

function openScreen(){
	console.log("I have clicked a button.")
}

function closeScreen(){
	console.log("I have clicked a different button.")
}

function screenClick(){
	console.log("I have clicked the panel.")
	const link = document.getElementById("screen")
	if (link != null){
		link.remove()
		console.log("e")
		const newlink = document.createElement("Panel")
		newlink.style.width = "1280"
		newlink.style.height = "720"
	}
}

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>NGVC</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar classroomName="Classroom Name" />

			<main className={styles.main}>
				<Card>
					<h1>Component test</h1>

					<p>This is a paragraph within a card.</p>

					<p>Below is a set of buttons.</p>

					<ButtonSet>
						<Button onClick={openScreen} label="Share screen" />
						<Button onClick={closeScreen} label="Unshare screen" unfilled />
					</ButtonSet>
				</Card>
				<Panel id='screen' label="Screen" onClick={screenClick}/>
			</main>
		</>
	);
};

export default Home;
