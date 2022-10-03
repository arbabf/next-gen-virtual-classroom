import assert from 'assert';
import { Component } from 'react';
import { RoomUser } from '../../entities/user/RoomUser';
import styles from '../user/UserEditingView.module.css';
import { UserView } from '../user/UserView';
import Button from '../common/button/button';

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



export class ProfileView extends Component<UserEditingViewProps, UserEditingViewState> {

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

		return (
			<div className={styles.container}>
                <br></br>
                <span><h1>Profile</h1></span>

                <UserView user={this.state.user} loggedInUser={this.state.user} hideName />

                <span className={styles.namePreview}>
                    <table>
                        <tr>
                            <td>Name:</td>
                            <br></br>
                            <td>Test User</td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <br></br>
                            <td>test@server.com</td>
                        </tr>
                        <tr>
                            <td>Current Unit:</td>
                            <br></br>
                            <td>FIT 3162, 3143, 3155</td>
                        </tr>
                    </table>

                </span>

                <span className={styles.namePreview}>
                <table>
                    <tr>
                        <td>Self Intro: </td>
                        <br></br>
                        <td>This Guy is lazy, he left nothing.</td>
                    </tr>
                </table>
                </span>
				
                <Button onClick={()=> alert("Friend invitation sent.")}>
                    Add Friend
                </Button>

                <Button onClick={()=> alert("Say HI to Test User! Hello World!")}>
                    Say HI
                </Button>
                
                

			</div>
		)
	}

}