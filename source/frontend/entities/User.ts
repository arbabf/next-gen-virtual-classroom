import { v4 as uuidv4 } from 'uuid';

export class User {
	id: string;
	name: string;
	email?: string;

	constructor(name: string, email?: string, id: string = uuidv4()) {
		this.id = id;
		this.name = name;
		this.email = email;
	}
}

export const testUser = new User('John Smith', 'john@example.com', '0');
export const testUser2 = new User('Will Smith', 'john@example.com', '1');
export const testUser3 = new User('Kelvin Smith', 'kelvin@example.com', '2');

export const testUserList = [testUser, testUser2, testUser3];
