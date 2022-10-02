import { RoomInfo } from '../entities/Room';
import { testRoom } from '../entities/TestEntities';
import { User } from '../entities/User';

export class UserAPI {
	static async getUserRooms(user: User) {
		return new Promise<RoomInfo[]>((resolve, reject) => {
			// make the fetch
			console.log('(Test) Fetching rooms for user with ID: ' + user.id);

			// check for errors

			// return
			resolve([testRoom]);
		});
	}

	/**
	 * Submits login email to server, which checks if a user exists with that email.
	 * 
	 * UI will then proceed to next step in login flow.
	 * 
	 * @param email Email to be checked
	 * @returns email login response with flow and user ID or false if email doesn't exist
	 */
	static async loginSubmitEmail(email: string) {
		return new Promise<string | false>((resolve, reject) => {
			// make the fetch

			// check for errors

			// return
			resolve('0');
		});
	}
}
