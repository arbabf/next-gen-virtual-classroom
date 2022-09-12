import { Capabilities } from "./Capabilities";

/**
 * Default caps set for each default role
 */
export class DefaultCapabilities {
	static readonly participant = [
		Capabilities.CAN_USE_SCREENS,
		Capabilities.CAN_SEND_MESSAGES
	]

	static readonly facilitator = [
		...DefaultCapabilities.participant,
		Capabilities.CAN_BAN_USERS,
		Capabilities.CAN_KICK_USERS,
		Capabilities.CAN_MUTE_USERS,
		Capabilities.CAN_EDIT_SCREENS,
		Capabilities.CAN_CONTROL_LOCKED_SCREENS,
		Capabilities.CAN_CONTROL_TABLE_LOCKS,
		Capabilities.CAN_START_DISCUSSIONS,
		Capabilities.CAN_MAKE_ANNOUNCEMENTS,
		Capabilities.CAN_MOVE_USERS,
		Capabilities.CAN_LOCK_SCREENS,
		Capabilities.CAN_BYPASS_TABLE_LOCKS
	]

	static readonly host = [
		...DefaultCapabilities.facilitator,
		Capabilities.CAN_MODIFY_ROLES,
		Capabilities.CAN_EDIT_USER_ROLES,
		Capabilities.CAN_EDIT_ROOM
	]
}