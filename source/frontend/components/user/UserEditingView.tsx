import assert from 'assert';
import { Component } from 'react';
import { RoomUser } from '../../entities/user/RoomUser';
import { BadgeUserTypes } from '../common/badge/BadgeTypes';
import Button from '../common/button/button';
import styles from './UserEditingView.module.css';
import { UserView } from './UserView';

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

	newName: string;

	newID: string;

	newEmail: string | undefined;
	user: RoomUser;
	statusMessage?: string;
}



export class UserEditingView extends Component<UserEditingViewProps, UserEditingViewState> {

	state: UserEditingViewState = {
		showContextMenu: false,
		newName: this.props.user.globalInfo.name,
		newID: this.props.user.globalInfo.id,
		newEmail: this.props.user.globalInfo.email,
		user: this.props.user,
	}

	render() {

		assert(this.props.user instanceof RoomUser);
		let avatar = this.props.user.getAvatar();

		// get user's avatar aspect ratio
		let shape = avatar.shape;

		let classes = styles.frame;
		let badgeSetClasses = styles.badgeSet;

		let roleBadgeType: BadgeUserTypes | undefined;

		return (
			<div className={styles.container}>
				<span className={styles.namePreview}>{this.state.user.globalInfo.name}</span>
				<span className={styles.namePreview}>{this.state.user.globalInfo.email}</span>
				<span className={styles.namePreview}>{this.state.user.globalInfo.id}</span>

				<UserView user={this.state.user} loggedInUser={this.state.user} hideName />


				<span className={styles.name}>Name</span>
				<textarea id="textName" value={this.state.newName} onChange={this.onNameChange.bind(this)} />
				<span className={styles.name}>Email</span>
				<textarea id="textEmail" value={this.state.newEmail} onChange={this.onEmailChange.bind(this)} />
				<span className={styles.name}>ID</span>
				<textarea id="textID" value={this.props.user.globalInfo.id} onChange={this.onIDChange.bind(this)} />

				<Button onClick={this.onSaveClick.bind(this)}>
					Save
				</Button>
				{this.state.statusMessage &&
					<div id="Saved">{this.state.statusMessage}</div>
				}
			</div>
		)
	}
	private onNameChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({ newName: event.target.value })
	}

	private onIDChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({ newID: event.target.value })
	}

	private onEmailChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({ newEmail: event.target.value })
	}

	private onSaveClick(this: this) {
		const user = this.state.user;
		let statusMessage = "Saved";
		const statuses: String[] = [];

		if (this.state.newName !== this.props.user.globalInfo.name) {
			user.globalInfo.name = this.state.newName;
			statuses.push("name");
		}

		if (this.state.newEmail !== this.props.user.globalInfo.email) {
			user.globalInfo.email = this.state.newEmail;
			statuses.push("email");
		}

		statusMessage += " " + statuses.join(", ");

		this.setState({ user, statusMessage });
	}



}