import assert from 'assert';
import { Component } from 'react';
import { RoomUser } from '../../entities/user/RoomUser';
import { AvatarView } from '../avatars/AvatarView';
import { Badge } from '../common/badge/Badge';
import { BadgeSet } from '../common/badge/BadgeSet';
import { BadgeUserTypes } from '../common/badge/BadgeTypes';
import styles from './UserEditingView.module.css';
import Button from '../common/button/button'
import ReactDOM from 'react-dom';

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

    newEmail: string|undefined;
}



export class UserEditingView extends Component<UserEditingViewProps, UserEditingViewState> {

	state: UserEditingViewState = {
		showContextMenu: false,
        newName: this.props.user.globalInfo.name,
        newID: this.props.user.globalInfo.id,
        newEmail: this.props.user.globalInfo.email
	}

    render(){

        assert(this.props.user instanceof RoomUser);
		let avatar = this.props.user.getAvatar();

		// get user's avatar aspect ratio
		let shape = avatar.shape;

		let classes = styles.frame;
		let badgeSetClasses = styles.badgeSet;

        let roleBadgeType: BadgeUserTypes | undefined;

        return(
			<div className={styles.container}>
                <span className={styles.namePreview}>{this.props.user.globalInfo.name}</span>
                <span className={styles.namePreview}>{this.props.user.globalInfo.email}</span>
                <span className={styles.namePreview}>{this.props.user.globalInfo.id}</span>
                <span>
                    <div className={styles.badgeWrapper}>
                        <BadgeSet className={badgeSetClasses}>
                            {roleBadgeType && <Badge type={roleBadgeType} />}
                            {<Badge type={BadgeUserTypes.you} />}
                        </BadgeSet>
                        <div className={classes}>
                            <AvatarView avatar={avatar} />
                        </div>
                        <BadgeSet className={badgeSetClasses}>
                            {this.props.user.state?.currentActions.map((action) => <Badge key={action} type={action} />)}
                        </BadgeSet>
                    </div>
                </span>


                <span className={styles.name}>Name</span>
                <textarea id = "textName" value={this.state.newName} onChange={this.onNameChange.bind(this)}/>
                <span className={styles.name}>Email</span>
                <textarea id = "textEmail" value={this.state.newEmail} onChange={this.onEmailChange.bind(this)}/>
                <span className={styles.name}>ID</span>
                <textarea id = "textID" value={this.props.user.globalInfo.id} onChange={this.onIDChange.bind(this)}/>
                
                <Button onClick = {this.onSaveClick.bind(this)}>
                    Save
                </Button>
                <div id = "Saved">

                </div>
			</div>
            )
        }
        private onNameChange(event: React.ChangeEvent<HTMLTextAreaElement>){
            this.setState({newName: event.target.value})
        }

        private onIDChange(event: React.ChangeEvent<HTMLTextAreaElement>){
            this.setState({newID: event.target.value})
        }

        private onEmailChange(event: React.ChangeEvent<HTMLTextAreaElement>){
            this.setState({newEmail: event.target.value})
        }

        private onSaveClick(this: this){
            if(this.state.newID !== this.props.user.globalInfo.id){

            }
            if(this.state.newName !== this.props.user.globalInfo.name){
                this.props.user.globalInfo.name = this.state.newName
            }

            if(this.state.newEmail !== this.props.user.globalInfo.email){
                this.props.user.globalInfo.email = this.state.newEmail
            }

            if(document.getElementById('Saved')){
                document.getElementById('Saved').innerHTML = "Saved"
            }
        }



}