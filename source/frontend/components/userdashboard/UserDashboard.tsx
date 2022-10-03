import Router from 'next/router';
import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import { testRoom } from '../../entities/TestEntities';
import { User } from '../../entities/User';
import { UserAPI } from '../../lib/UserAPI';
import Button from '../common/button/button';
import Card from '../common/card/card';
import Icon from '../common/icon/icon';
import styles from './UserDashboard.module.css';

type UserDashboardProps = {
	/**
	 * Current, logged in user
	 */
	user: User;
};

type UserDashboardState = {
	/**
	 * Set of rooms that the user would be a part of
	 */
	rooms: RoomInfo[];

	/**
	 * Logged-in user
	 */
	user?: User;
};

export default class UserDashboard extends Component<UserDashboardProps, UserDashboardState> {
	state: UserDashboardState = {
		rooms: [testRoom],
	};

	componentDidMount() {
		// check storage for user info
		const savedUser = this.fetchSavedUser();

		if (savedUser) {
			// fetch the user's rooms
			UserAPI.getUserRooms(this.props.user).then((rooms) => this.setState({ rooms }));
		}
		else {
			// redirect to login
			Router.push('/login');
		}
	}

	render(): ReactNode {
		return (
			<>
				<main className="content">
					<header>
						<div className="container">
							<h1>Welcome{this.state.user && `, ${this.state.user.name}`}</h1>
						</div>
					</header>
					<section>
						<div className="container">
							<h2>Your classes</h2>
							<div className={styles.roomList}>
								{this.state.rooms.map((room) => (
									<Card key={room.id}>
										<h3>{this.state.rooms[0].name}</h3>
										<Button>
											<Icon iconName="login" />
											<span>Join</span>
										</Button>
									</Card>
								))}
							</div>
						</div>
					</section>
				</main>
			</>
		);
	}

	/**
	 * Fetches the user's saved info from localStorage
	 */
	private fetchSavedUser(): User | undefined {
		const savedUser = localStorage.getItem('currentUser');
		if (savedUser) {
			// set the fields to the saved user
			const user = JSON.parse(savedUser) as User;

			this.setState({ user });

			return user;
		}

		return;
	}
}
