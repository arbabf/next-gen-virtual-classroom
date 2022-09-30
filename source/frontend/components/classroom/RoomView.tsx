import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import { TableInfo, TableState } from '../../entities/Table';
import { User } from '../../entities/User';
import { RoomUser } from '../../entities/user/RoomUser';
import { RoomInfoAPI, RoomStateAPI } from '../../lib/RoomAPI';
import ChatUI from '../chat/ChatUI';
import Icon from '../common/icon/icon';
import Navbar from '../navigation/navbar/navbar';
import NavbarHeader from '../navigation/navbar/NavbarHeader';
import NavbarItem from '../navigation/navbar/NavbarItem';
import ScreenContainer from '../screen/screencontainer/ScreenContainer';
import { ScreenSpace } from '../screen/ScreenSpace';
import SettingsPage from '../settings/SettingsPage';
import { Table } from '../tables/Table';
import { TableContainer } from '../tables/TableContainer';
import RoomSpace from './RoomSpace';

type RoomViewProps = {
	/**
	 * The associated Room entity that represents this classroom in the system.
	 */
	room: RoomInfo;

	/**
	 * Currently logged-in user
	 */
	user: User;
};

/**
 * Current state of the room
 */
type RoomViewState = {
	/**
	 * Whether the chat is visible
	 */
	chatVisible: boolean;

	/**
	 * Whether settings are visible
	 */
	settingsVisible: boolean;

	/**
	 * Current room's specific user info
	 */
	currentUser: RoomUser;

	/**
	 * Participants of this room
	 */
	participants: RoomUser[];

	/**
	 * Tables in this room
	 */
	tables: TableInfo[];

	/**
	 * Roaming space data
	 */
	roamingSpace: TableInfo;

	/**
	 * Stage space data
	 */
	stage: TableInfo;
};

/**
 * Views a room. Main view of the overall app. It manages the runtime state of the room and renders it.
 */
export default class RoomView extends Component<RoomViewProps, RoomViewState> {
	private navbarIconSize = '2em';

	state: RoomViewState = {
		chatVisible: false,
		settingsVisible: false,
		currentUser: new RoomUser(this.props.user),
		participants: [],
		tables: this.props.room.layout.tables,
		roamingSpace: this.props.room.layout.roamingSpace,
		stage: this.props.room.layout.stage,
	};

	componentDidMount() {
		this.fetchState();
	}

	render(): ReactNode {
		// composed parts of the room space
		/** Part of room where the stage will be placed */
		const stageArea: ReactNode = <Table state={this.state.stage.state} stage />;

		/** Part of the room where the roaming space will be placed */
		const roamingArea: ReactNode = <Table state={this.state.roamingSpace.state} roaming />;

		/** Part of the room where the tables will be placed */
		const tableArea: ReactNode = <TableContainer tables={this.state.tables} editTableCallback={this.editTableState.bind(this)} />;

		/** Part of the room where screens will be placed */
		const screenArea: ReactNode = <ScreenSpace>
			{this.props.room.layout.screens.length > 0 && this.props.room.layout.screens.map((screen) => (
				<ScreenContainer key={screen.id} />
			))}
		</ScreenSpace>;

		return (
			<>
				<Navbar>
					<NavbarHeader label={this.props.room.name} />
					<NavbarItem mobile active>
						<Icon iconName="home" size={this.navbarIconSize} />
					</NavbarItem>

					<NavbarItem
						onClick={() => {
							this.setState({ chatVisible: !this.state.chatVisible });
						}}
						active={this.state.chatVisible}
						id="nav-open-chat"
					>
						<Icon iconName="forum" size={this.navbarIconSize} />
					</NavbarItem>

					<NavbarItem
						onClick={() => {
							this.setState({ settingsVisible: !this.state.settingsVisible });
						}}
						active={this.state.settingsVisible}
						id="nav-open-settings"
					>
						<Icon iconName="settings" size={this.navbarIconSize} />
					</NavbarItem>
				</Navbar>

				<RoomSpace room={this.props.room} currentUser={this.state.currentUser} roamingArea={roamingArea} stageArea={stageArea} tableArea={tableArea} screenArea={screenArea} />

				<SettingsPage user={this.state.currentUser} hidden={!this.state.settingsVisible} />
				<ChatUI user={this.state.currentUser} room={this.props.room} hidden={!this.state.chatVisible} />
			</>
		);
	}

	/**
	 * Fetches the current room state from appropriate servers and middleware.
	 */
	private fetchState() {
		this.getCurrentRoomUser();
		this.getParticipants();
		this.getTableStates();
		this.getRoamingAndStageStates();
	}

	/**
	 * Gets live user info for this room
	 */
	private getCurrentRoomUser() {
		RoomInfoAPI.getRoomUser(this.props.user).then((roomUser) => {
			this.setState({ currentUser: roomUser });
		});
	}

	/**
	 * Retrieves the live user information for this room
	 */
	private getParticipants() {
		RoomStateAPI.getParticipants(this.props.room).then((participants) => {
			this.setState({ participants });
		});
	}

	/**
	 * Retrieves table states and modifies RoomView state accordingly
	 */
	private getTableStates() {
		RoomStateAPI.getTableStates(this.props.room).then((mapEntry) => {
			const stateCopy = this.state.tables;

			// construct new state
			const newState = stateCopy.map((table) => {
				const tableState = mapEntry.get(table.id);

				if (tableState) {
					const newTable = table.withState(tableState);
					return newTable;
				}
				else {
					return table;
				}
			});

			this.setState({ tables: newState });
		});
	}

	/**
	 * Gets the state for roaming and stage spaces
	 */
	private getRoamingAndStageStates() {
		this.getRoamingState();
		this.getStageState();
	}

	/**
	 * Gets the state for roaming space
	 */
	private getRoamingState() {
		RoomStateAPI.getTableState(this.state.roamingSpace).then((state) => {
			this.setState({ roamingSpace: this.state.roamingSpace.withState(state) });
		});
	}

	/**
	 * Gets the state for stage space
	 */
	private getStageState() {
		RoomStateAPI.getTableState(this.state.stage).then((state) => {
			this.setState({ stage: this.state.stage.withState(state) });
		});
	}

	// state modification
	/**
	 * Replaces table in space state with new table data
	 * @param table Table to edit
	 */
	protected editTableState(targetTableId: string, newState: TableState) {
		const edited = this.state.tables.map((table) => {
			if (table.id === targetTableId) return table.withState(newState);
			else return table;
		});

		this.setState({ tables: edited });
	}
}
