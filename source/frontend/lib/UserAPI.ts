import { Room, testRoom } from '../entities/Room';
import { User } from '../entities/User';

export class UserAPI {
	static async getUserRooms(user: User) {
		return new Promise<Room[]>((resolve, reject) => {
			// make the fetch
			console.log('(Test) Fetching rooms for user with ID: ' + user.id);

			// check for errors

			// return
			resolve([testRoom]);
		});
	}
}
