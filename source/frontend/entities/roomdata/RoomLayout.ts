import { TableInfo, testTableInfo } from '../Table';
import { ScreenInfo, testScreenInfo } from '../screens/ScreenInfo';

/**
 * Static room layout information to be drawn from DB or persistent storage
 */
export class RoomLayout {
	screens: ScreenInfo[];
	tables: TableInfo[];

	constructor(screens: ScreenInfo[] = [], tables: TableInfo[] = []) {
		this.screens = screens;
		this.tables = tables;
	}
}

export const testRoomLayout: RoomLayout = new RoomLayout([testScreenInfo], [testTableInfo]);
