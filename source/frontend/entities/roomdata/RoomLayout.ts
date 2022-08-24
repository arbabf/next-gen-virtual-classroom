import { TableInfo } from '../Table';
import { ScreenInfo } from '../screens/ScreenInfo';

/**
 * Static room layout information to be drawn from DB or persistent storage
 */
export class RoomLayout {
	screens: ScreenInfo[];
	tables: TableInfo[];

	constructor(screens: ScreenInfo[], tables: TableInfo[]) {
		this.screens = screens;
		this.tables = tables;
	}
}
