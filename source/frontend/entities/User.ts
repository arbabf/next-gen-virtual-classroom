import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '../lib/avatar/Avatar';
import { ImageAvatar } from '../lib/avatar/image/ImageAvatar';

export class User {
	id: string;
	name: string;
	email?: string;
	avatar?: Avatar;

	constructor(name: string, email?: string, id = uuidv4(), avatar: Avatar = defaultAvatar) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.avatar = avatar;
	}
}

// set up defaults
const defaultAvatar = new ImageAvatar('https://www.gravatar.com/avatar/0?s=200&d=mp&f=y');
