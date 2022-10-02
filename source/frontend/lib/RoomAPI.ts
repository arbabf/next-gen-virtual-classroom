import { Host } from '../entities/roles/Host';
import { RoomInfo } from '../entities/Room';
import { TableInfo, TableState } from '../entities/Table';
import { testRoomUserList, testUser, testUserList } from '../entities/TestEntities';
import { User } from '../entities/User';
import { RoomUser } from '../entities/user/RoomUser';
import { RoomUserState } from '../entities/user/RoomUserState';

/**
 * API integration for retrieving the current room state.
 *
 * This may be supplied by the middleware's client libraries.
 */
export class RoomStateAPI {
	/**
	 * Retrieves the current participant list for the current room.
	 *
	 * @param room The room you want to get the participant list for.
	 * @returns An async promise which will deliver the User list.
	 */
	static async getParticipants(room: RoomInfo): Promise<RoomUser[]> {
		return new Promise<RoomUser[]>((resolve, reject) => {
			// make the fetch
			console.log('(Test) Fetching participants for room with ID: ' + room.id);

			// check for errors

			// if errors, reject

			// if success, resolve
			// for testing, our list has one test user
			resolve([new RoomUser(testUser)]);
		});
	}

	/**
	 * Gets the table states for all tables
	 * 
	 * @param room static room data specifying the set of tables
	 * @returns All table states for a room
	 */
	static async getTableStates(room: RoomInfo): Promise<Map<String, TableState>> {
		return new Promise<Map<String, TableState>>((resolve, reject) => {
			// make fetch

			// check errors

			// resolve by mapping given room's table new table states with test users
			const stateMap = room.layout.tables.reduce((map, table) => map.set(table.id, new TableState(table, [...testRoomUserList])), new Map<String, TableState>());

			resolve(stateMap);
		});
	}

	/**
	 * Using table info, retrieves the live table state
	 * 
	 * @param table Static table data used to find respective table state
	 * @returns Current state information about this table
	 */
	static async getTableState(table: TableInfo): Promise<TableState> {
		return new Promise<TableState>((resolve, reject) => {
			// make fetch

			// check errors

			// resolve if it works
			let testUsers = [new User("Test user"), new User("Test user")]
			let testRoomUsers = testUsers.map((user) => new RoomUser(user));

			resolve(new TableState(table, testRoomUsers));
		})
	}

	/**
	 * Retrieves the given user's live state in middleware.
	 * 
	 * @param user room user info
	 * @returns copy of user with state
	 */
	static async getRoomUserState(user: RoomUser) {
		return new Promise<RoomUser>((resolve, reject) => {
			// fetch

			//check errors

			// resolve - debug data is a new host
			let testState = new RoomUserState();
			let resultUser = user;
			resultUser.state = testState;

			resolve(resultUser);
		});
	}
}

export class RoomInfoAPI {
	static getRoomUser(user: User) {
		return new Promise<RoomUser>((resolve, reject) => {
			// fetch

			// check errors

			// resolve - debug data is a new host
			resolve(new RoomUser(user, new Host()));
		});
	}
}
