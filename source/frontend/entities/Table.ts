import { v4 as uuidv4 } from 'uuid';
import { RoomUser } from './user/RoomUser';

/**
 * Current live state of a table, being the inclusion of users, etc.
 * Will ask from RoomAPI the current list of tables, and put info for tables.
 */
export class TableState {
	info: TableInfo;
	participants: RoomUser[];
	locked: boolean;

	constructor(tableInfo: TableInfo, participants?: RoomUser[], locked = false) {
		this.info = tableInfo;
		this.participants = participants || [];
		this.locked = locked;
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

	/**
	 * Pure function adding new state to this table.
	 * 
	 * @param state state to add
	 * @returns copy of this with new state
	 */
	withState(state: TableState): TableInfo {
		const newTable = this;
		newTable.state = state;
		return newTable;
	}
}
