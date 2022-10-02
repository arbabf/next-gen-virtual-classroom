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

type UserEditingViewProps = {
	/**
	 * User for changing
	 */
	user: RoomUser;
};

type UserEditingViewState = {
	/**
	 * Whether to show the user context menu
	 */
	showContextMenu: boolean;
}

export class UserEditingView extends Component<UserEditingViewProps, UserEditingViewState> {

	state: UserEditingViewState = {
		showContextMenu: false
	}

    render(){

        assert(this.props.user instanceof RoomUser);
		let avatar = this.props.user.getAvatar();

		// get user's avatar aspect ratio
		let shape = avatar.shape;

		let classes = styles.frame;
		let badgeSetClasses = styles.badgeSet;

        let roleBadgeType: BadgeUserTypes | undefined;

        return(
			<div className={styles.container}>
				<div className={styles.badgeWrapper}>
					<BadgeSet className={badgeSetClasses}>
						{roleBadgeType && <Badge type={roleBadgeType} />}
						{<Badge type={BadgeUserTypes.you} />}
					</BadgeSet>
					<div className={classes}>
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


}