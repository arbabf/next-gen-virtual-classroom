import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import { TableState } from '../../entities/Table';
import { User } from '../../entities/User';
import { RoomStateAPI } from '../../lib/RoomAPI';
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

type RoomSpaceState = {
	/**
	 * Participants
	 */
	participants: User[];

	/**
	 * Tables
	 */
	tables: TableState[];
}

/**
 * The render space for a Room.
 */
export default class RoomSpace extends Component<RoomSpaceProps, RoomSpaceState> {
	show = {
		isVisible: false,
	};

	state = {
		participants: [],
		tables: []
	}

	componentDidMount() {
		this.fetchState();
	}

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
					<TableContainer tables={this.state.tables} editTableCallback={this.editTableState.bind(this)} />
				</main>
			</>
		);
	}

	/**
	 * Replaces table in space state with new table data
	 * @param table Table to edit
	 */
	protected editTableState(newTable: TableState) {
		let newTables: TableState[] = this.state.tables;
		let edited = newTables.map((table) => {
			if (table.info.id === newTable.info.id) return newTable;
			else return table;
		});

		this.setState({ tables: edited });
	}

	/**
	 * Fetches the current room state from appropriate servers and middleware.
	 */
	private fetchState() {
		// establish static state for tables
		let staticTables = this.props.room.layout.tables.map((table) => new TableState(table));
		this.setState({ tables: staticTables });

		// make fetches
		this.fetchParticipants();
		this.fetchTables();
	}

	/**
	 * Fetches participant list and updates state.
	 */
	private fetchParticipants() {
		RoomStateAPI.getParticipants(this.props.room)
			.then((participants) => this.setState({ participants: participants }))
			.catch((error) => {
				alert("We couldn't connect to the other participants due to an error.");
			});
	}

	/**
	 * Fetches tables and updates state
	 */
	private fetchTables() {
		RoomStateAPI.getTableStates(this.props.room)
			.then((tables) => this.setState({ tables: tables }))
			.catch((error) => {
				alert('We ran into trouble getting the current state of tables.');
			});
	}
}
