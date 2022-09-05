import { Avatar } from '../Avatar';
import { AvatarFactory } from '../AvatarFactory';
import { ImageAvatarFactory } from './ImageAvatarFactory';

export class ImageAvatar extends Avatar {
	factory: AvatarFactory = new ImageAvatarFactory();

	url: string;

	constructor(url: string) {
		super();
		this.url = url;
	}
}
