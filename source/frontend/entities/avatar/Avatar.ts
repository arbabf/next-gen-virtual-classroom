import { v4 as uuidv4 } from 'uuid';
import { User } from '../User';
import { AvatarShape } from './AvatarShape';

/**
 * A user's avatar. Holds the its component factory.
 */
export abstract class Avatar {
	id: string;

	/**
	 * Shape of the avatar, used to help place it on the screen
	 */
	abstract shape: AvatarShape;

	/**
	 * Whether this avatar type uses the webcam, requiring permission
	 */
	abstract usesWebcam: boolean;

	constructor(id: string = uuidv4()) {
		this.id = id;
	}
}
