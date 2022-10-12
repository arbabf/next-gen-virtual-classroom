import type { NextPage } from 'next';
import Head from 'next/head';
import { UserEditingView } from '../components/user/UserEditingView';
import { testRoomUser } from '../entities/TestEntities';
import styles from '../styles/pages/Home.module.css';


const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Edit profile - NGVC</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<UserEditingView user={testRoomUser} />
			</main>
		</>
	);
};

export default Home;
