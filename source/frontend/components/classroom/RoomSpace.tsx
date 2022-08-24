import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import Card from '../common/card/card';
import ScreenContainer from '../screen/screencontainer/ScreenContainer';
import { ScreenSpace } from '../screen/ScreenSpace';
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
				<main className={styles.space}>
					{this.props.room.layout.screens.length > 0 && (
						<ScreenSpace>
							{this.props.room.layout.screens.map((screen) => (
								<ScreenContainer key={screen.id} />
							))}
						</ScreenSpace>
					)}
					<div className={styles.tables}>
						{this.props.room.layout.tables.map((table) => (
							<Card key={table.id}>
								<h3>Tables are WIP</h3>
							</Card>
						))}
					</div>
				</main>
			</>
		);
	}
}
