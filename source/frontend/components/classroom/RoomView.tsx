import { Component, ReactNode } from 'react';
import { RoomInfo } from '../../entities/Room';
import { User } from '../../entities/User';
import { RoomUser } from '../../entities/user/RoomUser';
import { RoomInfoAPI } from '../../lib/RoomAPI';
import ChatUI from '../chat/ChatUI';
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

	//whether show partMenu or not
	partMenuVis: boolean;

	/**
	 * Current room's specific user info
	 */
	roomUser: RoomUser;
};

/**
 * Views a room. Main view of the overall app.
 */
export default class RoomView extends Component<RoomViewProps, RoomViewState> {
	state: RoomViewState = {
		chatVisible: false,
		settingsVisible: false,
		partMenuVis: false,
		roomUser: new RoomUser(this.props.user),
	};

	componentDidMount() {
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

				<RoomSpace room={this.props.room} currentUser={this.state.roomUser} />

				<SettingsPage user={this.props.user} hidden={!this.state.settingsVisible} />
				<ChatUI user={this.props.user} room={this.props.room} hidden={!this.state.chatVisible} />
			</>
		);
	}

	/**
	 * Fetches the current room state from appropriate servers and middleware.
	 */
	private fetchState() {
		this.getCurrentRoomUser();
	}

	/**
	 * Gets live user info for this room
	 */
	private getCurrentRoomUser() {
		RoomInfoAPI.getRoomUser(this.props.user).then((roomUser) => {
			this.setState({ roomUser });
		});
	}
}
