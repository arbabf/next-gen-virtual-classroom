import { Component } from "react";
import User from "../../entities/User";
import Card from "../common/card/card";

type UserSettingsProps = {
	/**
	 * Subject of the settings section
	 */
	user: User;
}

export default class UserSettings extends Component<UserSettingsProps> {
	render() {
		return (
			<section>
				<Card>
					<p>{this.props.user.name}</p>
				</Card>
			</section>
		)
	}
}