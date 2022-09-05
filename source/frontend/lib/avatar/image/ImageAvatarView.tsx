import Image from 'next/image';
import { AvatarView } from '../AvatarView';
import commonStyles from '../common.module.css';
import { ImageAvatar } from './ImageAvatar';
import styles from './ImageAvatar.module.css';

export type ImageAvatarViewProps = {
	avatar: ImageAvatar;
};

export class ImageAvatarView extends AvatarView {
	avatar: ImageAvatar;

	constructor(props: ImageAvatarViewProps) {
		super(props);
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
