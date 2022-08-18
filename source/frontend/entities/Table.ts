import { RoomInfo, testRoom } from './Room';
import { testUserList, User } from './User';

/**
 * Current live state of a table, being the inclusion of users, etc.
 */
export class TableState {
	info: TableInfo;
	participants: User[];

	constructor(tableInfo: TableInfo, participants?: User[]) {
		this.info = tableInfo;
		this.participants = participants || [];
	}
}

/**
 * A table is a group of users who are able to communicate with one another. This is the static
 * definition of a table as held within RoomInfo.
 */
export class TableInfo {
	id: string;
	room: RoomInfo;

	constructor(id: string, room: RoomInfo) {
		this.id = id;
		this.room = room;
	}
}

export const testTableInfo = new TableInfo('0', testRoom);
export const testTableState = new TableState(testTableInfo, testUserList);
