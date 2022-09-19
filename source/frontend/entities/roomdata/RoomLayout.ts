import { TableInfo } from '../Table';
import { ScreenInfo } from '../screens/ScreenInfo';

/**
 * Static room layout information to be drawn from DB or persistent storage
 */
export class RoomLayout {
	screens: ScreenInfo[];
	tables: TableInfo[];
	roamingSpace: TableInfo;
	stage: TableInfo;

	constructor(screens: ScreenInfo[] = [], tables: TableInfo[] = [], roamingSpace: TableInfo = new TableInfo(), stage: TableInfo = new TableInfo()) {
		this.screens = screens;
		this.tables = tables;
		this.roamingSpace = roamingSpace;
		this.stage = stage;
	}
}
