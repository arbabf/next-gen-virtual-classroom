import { Avatar } from './Avatar';
import { AvatarView } from './AvatarView';

export interface AvatarFactory {
	/**
	 * Creates an avatar view for the given avatar info.
	 */
	createAvatarView(avatar: Avatar): AvatarView;

	/**
	 * Creates avatar editor for given info.
	 */
	// createAvatarEditor(avatar: Avatar): AvatarEditor;
}
