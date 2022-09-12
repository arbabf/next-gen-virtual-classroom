import { v4 as uuidv4 } from 'uuid';
import { Avatar } from './avatar/Avatar';
import { ImageAvatar } from './avatar/image/ImageAvatar';
import { UserState } from './user/UserState';

/**
 * A user in our system. A user always has a name, ID, and avatar. If the user doesn't set an
 * avatar from the start, a default image-based one is set.
 */
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
	 * User's saved avatar info - they can have multiple
	 */
	avatars: Avatar[];

	/**
	 * User's preferred avatar
	 */
	preferredAvatar: string;

	/**
	 * User's current state during runtime
	 */
	state?: UserState;

	constructor(name: string, email?: string, id = uuidv4(), avatars: Avatar[] = [defaultAvatar], preferredAvatar?: string, userState?: UserState) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.avatars = avatars;
		this.state = userState;
		this.preferredAvatar = preferredAvatar || avatars[0].id;
	}

	/**
	 * Gets the user's preferred avatar, which is the first avatar in their avatar list by default.
	 * 
	 * @returns The user's preferred avatar
	 */
	getPeferredAvatar(): Avatar {
		return this.avatars.find(avatar => avatar.id === this.preferredAvatar) || this.avatars[0];
	}
}

// set up defaults
const defaultAvatar = new ImageAvatar('https://www.gravatar.com/avatar/0?s=200&d=mp&f=y');
