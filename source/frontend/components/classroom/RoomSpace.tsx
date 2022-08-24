import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import { testUser } from '../../entities/User';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';
import Icon from '../common/icon/icon';
import Modal from '../common/modal/Modal';
import NavbarItem from '../navigation/navbar/NavbarItem';
import ScreenContainer from '../screen/screencontainer/ScreenContainer';
import { ScreenSpace } from '../screen/ScreenSpace';
import SettingsPage from '../settings/SettingsPage';
import styles from './RoomSpace.module.css';

type RoomSpaceProps = {
	/**
	 * Room entity to fill out this space
	 */
	room: RoomInfo;
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
				<main>
					{this.props.room.layout.screens.length > 0 && (
						<ScreenSpace>
							{this.props.room.layout.screens.map((screen) => (
								<ScreenContainer key={screen.id} />
							))}
						</ScreenSpace>
					)}
				</main>
			</>
		);
	}
}
