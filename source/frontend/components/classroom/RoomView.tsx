import { Component, ReactNode } from 'react';
import { Room } from '../../entities/Room';
import Icon from '../common/icon/icon';
import Navbar from '../navigation/navbar/navbar';
import NavbarHeader from '../navigation/navbar/NavbarHeader';
import NavbarItem from '../navigation/navbar/NavbarItem';
import RoomSpace from './RoomSpace';

type RoomViewProps = {
	/**
	 * The associated Room entity that represents this classroom in the system.
	 */
	room: Room;
};
/**
 * Views a room. Main view of the overall app.
 */
export default class RoomView extends Component<RoomViewProps> {
	render(): ReactNode {
		return (
			<>
				<Navbar>
					<NavbarHeader label={this.props.room.name} />
					<NavbarItem mobile active>
						<Icon iconName="home" />
					</NavbarItem>
					<NavbarItem>
						<Icon iconName="forum" />
					</NavbarItem>
					<NavbarItem>
						<Icon iconName="settings" />
					</NavbarItem>
				</Navbar>
				<RoomSpace room={this.props.room} />
			</>
		);
	}
}
