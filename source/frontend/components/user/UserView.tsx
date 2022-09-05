import { Component } from 'react';
import { User } from '../../entities/User';
import styles from './UserView.module.css';

type UserViewProps = {
	/**
	 * User for this avatar
	 */
	user: User;
};

export class UserView extends Component<UserViewProps> {
	render() {
		// get user's avatar component
		let component = this.props.user.avatar?.factory.createAvatarView(this.props.user.avatar);

		return (
			<div className={styles.container}>
				<div className={styles.frame}>{component?.render()}</div>
				<span className={styles.name}>{this.props.user.name}</span>
			</div>
		);
	}
}
