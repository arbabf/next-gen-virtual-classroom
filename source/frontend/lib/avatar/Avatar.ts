import { User } from '../../entities/User';
import { AvatarFactory } from './AvatarFactory';

/**
 * A user's avatar. Holds the its component factory.
 */
export abstract class Avatar {
	abstract factory: AvatarFactory;
}
