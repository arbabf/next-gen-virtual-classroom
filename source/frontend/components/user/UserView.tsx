import assert from 'assert';
import { Component, MouseEvent } from 'react';
import { AvatarShape } from '../../entities/avatar/AvatarShape';
import { Facilitator } from '../../entities/roles/Facilitator';
import { Host } from '../../entities/roles/Host';
import { RoomUser } from '../../entities/user/RoomUser';
import { AvatarView } from '../avatars/AvatarView';
import { Badge } from '../common/badge/Badge';
import { BadgeSet } from '../common/badge/BadgeSet';
import { BadgeUserTypes } from '../common/badge/BadgeTypes';
import PartMenu from '../participantMenu/PartMenu';
import styles from './UserView.module.css';

type UserViewProps = {
	/**
	 * User for this avatar
	 */
	user: RoomUser;

	/**
	 * Whether this view shows the current user
	 */
	loggedInUser?: RoomUser;
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
		assert(this.props.user instanceof RoomUser);
		let avatar = this.props.user.getAvatar();

		// get user's avatar aspect ratio
		let shape = avatar.shape;

		let classes = styles.frame;
		let badgeSetClasses = styles.badgeSet;

		if (shape === AvatarShape.SQUARE || shape === AvatarShape.CIRCLE) {
			classes += ' ' + styles.square;
			badgeSetClasses += ' ' + styles.squareBadgeSet;
		};

		let roleBadgeType: BadgeUserTypes | undefined;

		if (this.props.user.role instanceof Host) roleBadgeType = BadgeUserTypes.host;
		else if (this.props.user.role instanceof Facilitator) roleBadgeType = BadgeUserTypes.facilitator;


		return (
			<div className={styles.container}>
				<div className={styles.badgeWrapper}>
					<BadgeSet className={badgeSetClasses}>
						{roleBadgeType && <Badge type={roleBadgeType} />}
						{this.isCurrentUser() && <Badge type={BadgeUserTypes.you} />}
					</BadgeSet>
					<div className={classes} onClick={(e) => this.onUserClick(e)}>
						<AvatarView avatar={avatar} />
					</div>
					<BadgeSet className={badgeSetClasses}>
						{this.props.user.state?.currentActions.map((action) => <Badge key={action} type={action} />)}
					</BadgeSet>
				</div>
				<span className={styles.name}>{this.props.user.globalInfo.name}</span>
				<PartMenu user={this.props.user} hidden={!this.state.showContextMenu} />
			</div>
		);

	}

	onUserClick(event: MouseEvent) {
		this.setState({ showContextMenu: !this.state.showContextMenu });
	}

	/**
	 * Checks if UserView is for current user, allowing badge to be displayed.
	 * 
	 * @returns true if this view is for the current user
	 */
	private isCurrentUser() {
		return this.props.loggedInUser && this.props.user.global.id === this.props.loggedInUser.global.id;
	}
}
