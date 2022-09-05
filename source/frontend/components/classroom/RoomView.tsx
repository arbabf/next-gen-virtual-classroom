import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import { TableState } from '../../entities/Table';
import { User } from '../../entities/User';
import { RoomStateAPI } from '../../lib/RoomAPI';
import ChatUI from '../chat/ChatUI';
import Icon from '../common/icon/icon';
import Modal from '../common/modal/Modal';
import Navbar from '../navigation/navbar/navbar';
import NavbarHeader from '../navigation/navbar/NavbarHeader';
import NavbarItem from '../navigation/navbar/NavbarItem';
import PartMenu from '../participantMenu/PartMenu';
import SettingsPage from '../settings/SettingsPage';
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
	 * Who is in the room
	 */
	participants: User[];

	/**
	 * State of tables
	 */
	tables: TableState[];

	/**
	 * Whether the chat is visible
	 */
	chatVisible: boolean;

	/**
	 * Whether settings are visible
	 */
	settingsVisible: boolean;

	//whether show partMenu or not
	partMenuVis: boolean;
};

/**
 * Views a room. Main view of the overall app.
 */
export default class RoomView extends Component<RoomViewProps, RoomViewState> {
	state = {
		participants: [],
		tables: [],
		chatVisible: false,
		settingsVisible: false,
		partMenuVis: false,
		screenState: { screenOn: true },
	};

	componentDidMount() {
		console.log('doing fetch');
		this.fetchState();
	}

	render(): ReactNode {
		return (
			<>
				<Navbar>
					<NavbarHeader label={this.props.room.name} />
					<NavbarItem mobile active>
						<Icon iconName="home" />
					</NavbarItem>

					<NavbarItem
						onClick={() => {
							this.setState({ chatVisible: !this.state.chatVisible });
						}}
						active={this.state.chatVisible}
					>
						<Icon iconName="forum" />
					</NavbarItem>

					<NavbarItem
						onClick={() => {
							this.setState({ settingsVisible: !this.state.settingsVisible });
						}}
						active={this.state.settingsVisible}
					>
						<Icon iconName="settings" />
					</NavbarItem>
				</Navbar>

				<RoomSpace room={this.props.room} tables={this.state.tables} />

				<Modal open>
					<h2>Temp Space</h2>
					<p>For Participant context menu</p>
					<p>Once Avatars exist, move this function into it.</p>

					<NavbarItem
						onClick={() => {
							this.setState({ partMenuVis: !this.state.partMenuVis });
						}}
					>
						<Icon iconName="person" />
					</NavbarItem>
				</Modal>

				<SettingsPage user={this.props.user} hidden={!this.state.settingsVisible} />

				<PartMenu user={this.props.user} hidden={!this.state.partMenuVis} />
				<ChatUI user={this.props.user} hidden={!this.state.chatVisible} />
			</>
		);
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
