import { RoomInfo } from "../Room";
import { TableInfo } from "../Table";
import { RoomUser } from "../user/RoomUser";

/**
 * A recipient of a chat message, which can be any of the scopes. The scopes can be direct,
 * table-wide, or classroom-wide.
 */
export type ChatRecipient = RoomUser | TableInfo | RoomInfo;
