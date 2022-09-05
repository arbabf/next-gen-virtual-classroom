import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import { TableState } from '../../entities/Table';
import ScreenContainer from '../screen/screencontainer/ScreenContainer';
import { ScreenSpace } from '../screen/ScreenSpace';
import { TableContainer } from '../tables/TableContainer';
import styles from './RoomSpace.module.css';

type RoomSpaceProps = {
	/**
	 * Room entity to fill out this space
	 */
	room: RoomInfo;

	/**
	 * Table states
	 */
	tables: TableState[];
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
					<TableContainer tables={this.props.tables} />
				</main>
			</>
		);
	}
}
