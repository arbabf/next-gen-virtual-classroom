import { RoomInfo } from '../entities/Room';
import { TableInfo, TableState } from '../entities/Table';
import { testUser, testUserList } from '../entities/TestEntities';
import { User } from '../entities/User';

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
	static async getParticipants(room: RoomInfo): Promise<User[]> {
		return new Promise<User[]>((resolve, reject) => {
			// make the fetch
			console.log('(Test) Fetching participants for room with ID: ' + room.id);

			// check for errors

			// if errors, reject

			// if success, resolve
			// for testing, our list has one test user
			resolve([testUser]);
		});
	}

	/**
	 * Gets the table states for all tables
	 * 
	 * @param room static room data specifying the set of tables
	 * @returns All table states for a room
	 */
	static async getTableStates(room: RoomInfo): Promise<TableState[]> {
		return new Promise<TableState[]>((resolve, reject) => {
			// make fetch

			// check errors

			// resolve by mapping given room's table new table states with test users
			resolve(room.layout.tables.map((table) => new TableState(table, testUserList)));
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
			resolve(new TableState(table, [new User("Test user"), new User("Test user")]));
		})
	}
}
