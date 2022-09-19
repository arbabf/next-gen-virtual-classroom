import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import { RoomUser } from '../../entities/user/RoomUser';
import styles from './RoomSpace.module.css';

type RoomSpaceProps = {
	/**
	 * Room entity to fill out this space
	 */
	room: RoomInfo;

	/**
	 * Logged in user
	 */
	currentUser: RoomUser;

	/**
	 * Roaming space slot
	 */
	roamingArea: ReactNode;

	/**
	 * Stage space slot
	 */
	stageArea: ReactNode;

	/**
	 * Table area
	 */
	tableArea: ReactNode;

	/**
	 * Screen area
	 */
	screenArea: ReactNode;
};

/**
 * The render space for a Room.
 */
export default class RoomSpace extends Component<RoomSpaceProps> {
	show = {
		isVisible: false,
	};

	render(): ReactNode {
		return (
			<>
				<header className={styles.header}>
					<h1>{this.props.room.name}</h1>
				</header>
				<main className={styles.space}>
					{this.props.screenArea}
					{this.props.stageArea}
					{this.props.roamingArea}
					{this.props.tableArea}
				</main>
			</>
		);
	}
}
