import { Avatar } from '../Avatar';
import { AvatarFactory } from '../AvatarFactory';
import { ImageAvatarFactory } from './ImageAvatarFactory';

/**
 * An avatar based on a static image
 */
export class ImageAvatar extends Avatar {
	factory: AvatarFactory = new ImageAvatarFactory();

	url: string;

	constructor(url: string) {
		super();
		this.url = url;
	}
}
