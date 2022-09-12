import { UserAction } from "./UserAction";

export class UserState {
	/**
	 * Current actions being performed
	 */
	currentActions: UserAction[];

	/**
	 * Whether the user is selected
	 */
	selected: boolean;

	constructor(actions: UserAction[] = [], selected = false) {
		this.currentActions = actions;
		this.selected = selected;
	}
}