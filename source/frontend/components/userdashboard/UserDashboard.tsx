import { Component, ReactNode } from 'react';
import { Room, testRoom } from '../../entities/Room';
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
	rooms: Room[];
};

export default class UserDashboard extends Component<UserDashboardProps, UserDashboardState> {
	state = {
		rooms: [testRoom],
	};

	componentDidMount() {
		UserAPI.getUserRooms(this.props.user).then((rooms) => this.setState({ rooms }));
	}

	render(): ReactNode {
		return (
			<>
				<main className="content">
					<header>
						<div className="container">
							<h1>Welcome, {this.props.user.name}</h1>
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
}
