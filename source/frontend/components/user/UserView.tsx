import { Component } from 'react';
import { User } from '../../entities/User';
import { AvatarShape } from '../../entities/avatar/AvatarShape';
import { AvatarView } from '../avatars/AvatarView';
import styles from './UserView.module.css';

type UserViewProps = {
	/**
	 * User for this avatar
	 */
	user: User;
};

export class UserView extends Component<UserViewProps> {
	render() {
		let avatar = this.props.user.getPeferredAvatar();

		// get user's avatar aspect ratio
		let shape = avatar.shape;

		let classes = styles.frame;

		if (shape === AvatarShape.SQUARE || shape === AvatarShape.CIRCLE) classes += ' ' + styles.square;

		return (
			<div className={styles.container}>
				<div className={classes}>
					<AvatarView avatar={avatar} />
				</div>
				<span className={styles.name}>{this.props.user.name}</span>
			</div>
		);
	}
}
