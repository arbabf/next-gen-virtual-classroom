import { v4 as uuidv4 } from 'uuid';
import { RoomUser } from './user/RoomUser';

/**
 * Current live state of a table, being the inclusion of users, etc.
 */
export class TableState {
	info: TableInfo;
	participants: RoomUser[];

	constructor(tableInfo: TableInfo, participants?: RoomUser[]) {
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
	roaming: boolean;
	state?: TableState;

	constructor(id: string = uuidv4(), tableState?: TableState, roaming = false) {
		this.id = id;
		this.state = tableState;
		this.roaming = roaming;
	}
}
