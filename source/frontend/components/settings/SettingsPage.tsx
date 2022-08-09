import { Component } from "react";
import User from "../../entities/User";
import styles from './SettingsPage.module.css';
import UserSettings from "./UserSettings";

type SettingsPageProps = {
	user: User;
}

export default class SettingsPage extends Component<SettingsPageProps> {
	render() {
		return (
			<div className={styles.page}>
				<UserSettings user={this.props.user} />
			</div>
		)
	}
}