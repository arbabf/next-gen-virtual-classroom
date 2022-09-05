import assert from 'assert';
import Image from 'next/image';
import { AvatarView, AvatarViewProps } from '../AvatarView';
import commonStyles from '../common.module.css';
import { ImageAvatar } from './ImageAvatar';
import styles from './ImageAvatar.module.css';

/**
 * Implementation of an image-based avatar component.
 */
export class ImageAvatarView extends AvatarView {
	avatar: ImageAvatar;

	constructor(props: AvatarViewProps) {
		super(props);
		assert(props.avatar instanceof ImageAvatar);
		this.avatar = props.avatar;
	}

	render() {
		let classes = commonStyles.frame + ' ' + styles.frame;

		return (
			<div className={classes}>
				<Image src={this.avatar.url} alt="User avatar" layout="fill" />
			</div>
		);
	}
}
