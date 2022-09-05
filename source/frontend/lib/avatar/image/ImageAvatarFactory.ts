import { Avatar } from '../Avatar';
import { AvatarFactory } from '../AvatarFactory';
import { AvatarView, AvatarViewProps } from '../AvatarView';
import { ImageAvatarView } from './ImageAvatarView';

export class ImageAvatarFactory implements AvatarFactory {
	createAvatarView(avatar: Avatar): AvatarView {
		let props: AvatarViewProps = {
			avatar: avatar,
		};

		return new ImageAvatarView(props);
	}
}
