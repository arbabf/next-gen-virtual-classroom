import { Component } from "react";
import { User } from "../../entities/User";
import AppSettings from "./AppSettings";
import styles from './SettingsPage.module.css';
import UserSettings from "./UserSettings";

type SettingsPageProps = {
	user: User;
}

export default class SettingsPage extends Component<SettingsPageProps> {
	render() {
		return (
			<div className={styles.page}>
				<section>
					<h2>Settings</h2>
				</section>
				<UserSettings user={this.props.user} />
				<AppSettings />
			</div>
		)
	}
}