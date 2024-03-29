import { Component } from 'react';
import { RoomUser } from '../../entities/user/RoomUser';
import AppSettings from './AppSettings';
import styles from './SettingsPage.module.css';
import UserSettings from './UserSettings';

type SettingsPageProps = {
	/**
	 * Current user to consider
	 */
	user: RoomUser;

	/**
	 * Whether to show this component or not
	 */
	hidden?: boolean;
};

export default class SettingsPage extends Component<SettingsPageProps> {
	render() {
		let classes = styles.page;

		if (this.props.hidden === true) {
			classes += ' ' + styles.hidden;
		}

		return (
			<div className={classes}>
				<section>
					<h2>Settings</h2>
				</section>
				<UserSettings user={this.props.user} />
				<AppSettings />
			</div>
		);
	}
}
