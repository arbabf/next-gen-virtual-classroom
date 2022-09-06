import { Organisation } from './Organisation';
import { Folder } from './resources/Folder';
import { Resource } from './resources/Resource';
import { RoomInfo } from './Room';
import { RoomLayout } from './roomdata/RoomLayout';
import { ScreenInfo } from './screens/ScreenInfo';
import { TableInfo, TableState } from './Table';
import { User } from './User';

export const testScreenInfo = new ScreenInfo('Test Screen', '0');

export const testResource = new Resource(
	'Google Privacy Policy',
	'https://www.gstatic.com/policies/privacy/pdf/20220210/8e0kln2a/google_privacy_policy_en.pdf',
	'0'
);

export const testUser = new User('John Smith', 'john@example.com', '0');
export const testUser2 = new User('Will Smith', 'john@example.com', '1');
export const testUser3 = new User('Kelvin Smith', 'kelvin@example.com', '2');

export const testUserList = [testUser, testUser2, testUser3];

// dependent test entities
export const testFolder = new Folder([], 'Test Folder');

export const testOrganisation = new Organisation(
	'Test Organisation',
	'Organisation made for testing purposes',
	'0'
);

let testRoomTemp = new RoomInfo(
	'Test Room',
	'Room made for testing purposes',
	testOrganisation,
	'0'
);

export const testTableInfo = new TableInfo(testRoomTemp, '0');
export const testTableState = new TableState(testTableInfo, testUserList);

export const testRoomLayout: RoomLayout = new RoomLayout([testScreenInfo], [testTableInfo, new TableInfo(testRoomTemp), new TableInfo(testRoomTemp)]);

testRoomTemp.layout = testRoomLayout;

export const testRoom = testRoomTemp;
