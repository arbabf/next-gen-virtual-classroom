import {User} from './User';

export class Table {
	id: string;
	participants: User[];

	constructor(id: string, participants:User[]) {
		this.id = id;
        this.participants = participants
		
	}
}

export const testUser0 = new User("0", "John Smith", "john@example.com");
export const testUser1 = new User("0", "Will Smith", "john@example.com");
export const testUser2 = new User("0", "Kelvin Smith", "kelvin@example.com");