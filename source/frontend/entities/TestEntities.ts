import { RoomGroup } from './org/RoomGroup';
import { RoomGroupType } from './org/RoomGroupType';
import { Organisation } from './Organisation';
import { Folder } from './resources/Folder';
import { Resource } from './resources/Resource';
import { RoomInfo } from './Room';
import { RoomLayout } from './roomdata/RoomLayout';
import { ScreenInfo } from './screens/ScreenInfo';
import { TableInfo, TableState } from './Table';
import { User } from './User';
import { RoomUser } from './user/RoomUser';

export const testScreenInfo = new ScreenInfo('Test Screen', '0');

export const testResource = new Resource(
	'Google Privacy Policy',
	'https://www.gstatic.com/policies/privacy/pdf/20220210/8e0kln2a/google_privacy_policy_en.pdf',
	'0'
);

export const testUser = new User('John Smith', 'john@example.com', '0');
export const testUser2 = new User('Will Smith', 'will@example.com', '1');
export const testUser3 = new User('Kelvin Smith', 'kelvin@example.com', '2');

export const testUserList = [testUser, testUser2, testUser3];
export const testRoomUserList = testUserList.map((user) => new RoomUser(user));

// room groups
export const groupTypeBuilding = new RoomGroupType('Building', 'A building with multiple floors');
export const groupTypeFloor = new RoomGroupType('Floor', 'A floor within a building');

export const roomGroupLTB = new RoomGroup('Learning and Teaching Building', 'A large building with 4 floors', groupTypeBuilding);
export const roomGroupLTBLevel2 = new RoomGroup('Level 2', 'Second floor of the LTB', groupTypeFloor, [roomGroupLTB]);

// dependent test entities
export const testFolder = new Folder([], 'Test Folder');

export const testOrganisation = new Organisation(
	'Test Organisation',
	'ws://localhost:8002',
	'ws://localhost:8002',
	'Organisation made for testing purposes',
	'0'
);

let testRoomTemp = new RoomInfo(
	'Test Room',
	'Room made for testing purposes',
	testOrganisation,
	roomGroupLTBLevel2,
	'0'
);

export const testTableInfo = new TableInfo();
export const testTableState = new TableState(testTableInfo, testRoomUserList);

export const testRoomLayout: RoomLayout = new RoomLayout([testScreenInfo], [testTableInfo, new TableInfo(), new TableInfo()]);

testRoomTemp.layout = testRoomLayout;

export const testRoom = testRoomTemp;

export const testRoomUser = new RoomUser(testUser)

