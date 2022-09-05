import { Component } from 'react';
import { Avatar } from './Avatar';

export type AvatarViewProps = {
	avatar: Avatar;
};

/**
 * The component that displays this avatar.
 */
export abstract class AvatarView extends Component<AvatarViewProps> {
	abstract avatar: Avatar;
}
