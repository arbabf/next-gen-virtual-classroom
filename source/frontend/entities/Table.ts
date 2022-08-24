import { RoomInfo } from './Room';
import { User } from './User';
import { v4 as uuidv4 } from 'uuid';

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

	constructor(room: RoomInfo, id: string = uuidv4()) {
		this.id = id;
		this.room = room;
	}
}
