import { Component, ReactNode } from 'react';
import { Room } from '../../entities/Room';
import { testUser, User } from '../../entities/User';
import { RoomStateAPI } from '../../lib/RoomAPI';
import Icon from '../common/icon/icon';
import Navbar from '../navigation/navbar/navbar';
import NavbarHeader from '../navigation/navbar/NavbarHeader';
import NavbarItem from '../navigation/navbar/NavbarItem';
import SettingsPage from '../settings/SettingsPage';
import RoomSpace from './RoomSpace';

type RoomViewProps = {
	/**
	 * The associated Room entity that represents this classroom in the system.
	 */
	room: Room;
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
	 * Whether the chat is visible
	 */
	chatVisible: boolean;

	/**
	 * Whether settings are visible
	 */
	settingsVisible: boolean;
};

/**
 * Views a room. Main view of the overall app.
 */
export default class RoomView extends Component<RoomViewProps, RoomViewState> {
	state = {
		participants: [],
		chatVisible: false,
		settingsVisible: false,
	};

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
					>
						<Icon iconName="forum" />
					</NavbarItem>
					<NavbarItem
						onClick={() => {
							this.setState({ settingsVisible: !this.state.settingsVisible });
						}}
					>
						<Icon iconName="settings" />
					</NavbarItem>
				</Navbar>
				<RoomSpace room={this.props.room} />
				<SettingsPage user={testUser} hidden={!this.state.settingsVisible} />
			</>
		);
	}

	/**
	 * Fetches the current room state from appropriate servers and middleware.
	 */
	private fetchState() {
		this.fetchParticipants();
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
}
