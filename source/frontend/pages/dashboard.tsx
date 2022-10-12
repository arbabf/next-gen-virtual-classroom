import { NextPage } from 'next';
import Head from 'next/head';
import UserDashboard from '../components/userdashboard/UserDashboard';
import { User } from '../entities/User';

const Dashboard: NextPage = () =>
	<>
		<Head>
			<title>Dashboard - NGVC</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<UserDashboard user={new User("Test user", "test@example.com")} />
	</>;

export default Dashboard;
