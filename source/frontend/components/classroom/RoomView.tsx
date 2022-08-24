import { Component, ReactNode } from 'react';
import React from 'react';
import { RoomInfo } from '../../entities/Room';
import { testUser, User } from '../../entities/User';
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
import ScreenContainer from '../screen/screencontainer/ScreenContainer';

/**
 * Unused for now. Used in screenContext.
 * NB: Must use default values when initalising ScreenState in RoomView, or otherwise the context will probably crash the application.
 */
type ScreenState = {
	// DEBUG: remove later.
	screenOn: boolean;
};

export const screenContext = React.createContext({ screenOn: true });

type RoomViewProps = {
	/**
	 * The associated Room entity that represents this classroom in the system.
	 */
	room: RoomInfo;
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

	//whether show partMenu or not
	partMenuVis: boolean;

	/**
	 * Screen state.
	 */
	screenState: ScreenState;
};

/**
 * Views a room. Main view of the overall app.
 */
export default class RoomView extends Component<RoomViewProps, RoomViewState> {
	state = {
		participants: [],
		chatVisible: false,
		settingsVisible: false,
		partMenuVis: false,
		screenState: { screenOn: true },
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

				<RoomSpace room={this.props.room} />

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

				<SettingsPage user={testUser} hidden={!this.state.settingsVisible} />

				<PartMenu user={testUser} hidden={!this.state.partMenuVis} />
				<ChatUI user={testUser} hidden={!this.state.chatVisible} />

				<screenContext.Provider value={this.state.screenState}>
					<ScreenContainer />
				</screenContext.Provider>
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
