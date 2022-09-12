import { AvatarShape } from "./AvatarShape";

export abstract class AvatarType {
	/**
	 * Shape of the avatar, used to help place it on the screen
	 */
	abstract shape: AvatarShape;

	/**
	 * Whether this avatar type uses the webcam, requiring permission
	 */
	abstract usesWebcam: boolean;
}