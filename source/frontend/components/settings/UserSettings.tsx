import { Component } from 'react';
import { User } from '../../entities/User';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';
import Icon from '../common/icon/icon';

type UserSettingsProps = {
	/**
	 * Subject of the settings section
	 */
	user: User;
};

export default class UserSettings extends Component<UserSettingsProps> {
	render() {
		return (
			<section>
				<h3>Profile</h3>
				<Card>
					<p>{this.props.user.name}</p>
					<ButtonSet>
						<Button unfilled>
							<Icon iconName="logout" />
							<span>Sign out</span>
						</Button>
						<Button unfilled>
							<Icon iconName="person" />
							<span>Avatar settings</span>
						</Button>
					</ButtonSet>
				</Card>
			</section>
		);
	}
}
