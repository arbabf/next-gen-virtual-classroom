import assert from 'assert';
import { Avatar } from '../Avatar';
import { AvatarFactory } from '../AvatarFactory';
import { AvatarView } from '../AvatarView';
import { ImageAvatar } from './ImageAvatar';
import { ImageAvatarView, ImageAvatarViewProps } from './ImageAvatarView';

export class ImageAvatarFactory implements AvatarFactory {
	createAvatarView(avatar: Avatar): AvatarView {
		assert(avatar instanceof ImageAvatar);

		let props: ImageAvatarViewProps = {
			avatar: avatar,
		};

		return new ImageAvatarView(props);
	}
}
