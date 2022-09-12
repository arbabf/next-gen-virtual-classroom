import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '../lib/avatar/Avatar';
import { ImageAvatar } from '../lib/avatar/image/ImageAvatar';
import { UserState } from './user/UserState';

export class User {
	/**
	 * UUID of the user
	 */
	id: string;
	/**
	 * Name defined by user
	 */
	name: string;
	/**
	 * User's email
	 */
	email?: string;
	/**
	 * User's saved avatar info
	 */
	avatar?: Avatar;
	/**
	 * User's current state during runtime
	 */
	state?: UserState;

	constructor(name: string, email?: string, id = uuidv4(), avatar: Avatar = defaultAvatar, userState?: UserState) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.avatar = avatar;
		this.state = userState;
	}
}

// set up defaults
const defaultAvatar = new ImageAvatar('https://www.gravatar.com/avatar/0?s=200&d=mp&f=y');
