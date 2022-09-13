import { TableInfo } from "../Table";
import { UserAction } from "./UserAction";

/**
 * The current state of a user, such as their active actions, which table they're at, etc.
 */
export class RoomUserState {
	/**
	 * Current actions being performed
	 */
	currentActions: UserAction[];

	/**
	 * Whether the user is selected
	 */
	selected: boolean;

	/**
	 * Location of the current user (which table they're in)
	 */
	location?: TableInfo;

	constructor(actions: UserAction[] = [], selected = false) {
		this.currentActions = actions;
		this.selected = selected;
	}
}