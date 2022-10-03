import { Avatar } from "../../entities/avatar/Avatar";
import { SerialisationKeys } from "../../entities/avatar/AvatarSerialisation";
import { ImageAvatar } from "../../entities/avatar/image/ImageAvatar";
import { User } from "../../entities/User";

export function fetchUserFromStorage(): User | undefined {
	const savedUser = localStorage.getItem('currentUser');
	if (savedUser) {
		// set the fields to the saved user
		const userObject = JSON.parse(savedUser);
		const user: User = Object.setPrototypeOf(userObject, User.prototype);

		// restore avatars using serialisation keys
		user.avatars = user.avatars.map((avatar) => {
			if (avatar.serialisationKey === SerialisationKeys.IMAGE) return Object.setPrototypeOf(avatar, ImageAvatar.prototype);
			else return Object.setPrototypeOf(avatar, Avatar.prototype);
		});

		return user;
	}

	return;
}