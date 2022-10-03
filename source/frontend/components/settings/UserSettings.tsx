import Link from 'next/link';
import { Component } from 'react';
import { RoomUser } from '../../entities/user/RoomUser';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';
import Icon from '../common/icon/icon';

type UserSettingsProps = {
	/**
	 * Subject of the settings section
	 */
	user: RoomUser;
};

export default class UserSettings extends Component<UserSettingsProps> {
	render() {
		return (
			<section>
				<h3>Profile</h3>
				<Card>
					<p>{this.props.user.globalInfo.name}</p>
					<ButtonSet>
						<Button unfilled>
							<Icon iconName="logout" />
							<span>Sign out</span>
						</Button>

						<Link href={'/ProfileEditing'}>
							<Button unfilled>
								<Icon iconName="person" />
								<span>Avatar settings</span>
							</Button>
						</Link>
					</ButtonSet>
				</Card>
			</section>
		);
	}
}
