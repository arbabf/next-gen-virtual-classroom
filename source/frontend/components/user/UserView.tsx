import { Component, MouseEvent } from 'react';
import { AvatarShape } from '../../entities/avatar/AvatarShape';
import { User } from '../../entities/User';
import { AvatarView } from '../avatars/AvatarView';
import PartMenu from '../participantMenu/PartMenu';
import styles from './UserView.module.css';

type UserViewProps = {
	/**
	 * User for this avatar
	 */
	user: User;
};

type UserViewState = {
	/**
	 * Whether to show the user context menu
	 */
	showContextMenu: boolean;
}

/**
 * Displays a user on the page along with their name and avatar.
 */
export class UserView extends Component<UserViewProps, UserViewState> {
	state: UserViewState = {
		showContextMenu: false
	}

	render() {
		let avatar = this.props.user.getPeferredAvatar();

		// get user's avatar aspect ratio
		let shape = avatar.shape;

		let classes = styles.frame;

		if (shape === AvatarShape.SQUARE || shape === AvatarShape.CIRCLE) classes += ' ' + styles.square;

		return (
			<div className={styles.container}>
				<div className={classes} onClick={(e) => this.onUserClick(e)}>
					<AvatarView avatar={avatar} />
				</div>
				<span className={styles.name}>{this.props.user.name}</span>
				<PartMenu user={this.props.user} hidden={!this.state.showContextMenu} />
			</div>
		);

	}

	onUserClick(event: MouseEvent) {
		this.setState({ showContextMenu: !this.state.showContextMenu });
	}
}
