import { v4 as uuidv4 } from 'uuid';
import { User } from '../../User';
import { Avatar } from '../Avatar';
import { AvatarShape } from '../AvatarShape';

/**
 * An avatar based on a static image
 */
export class ImageAvatar extends Avatar {
	shape: AvatarShape = AvatarShape.CIRCLE;
	usesWebcam: boolean = false;

	url: string;

	constructor(url: string, id: string = uuidv4()) {
		super(id);
		this.url = url;
	}
}
