export class User {
	id: string;
	name: string;
	email?: string;

	constructor(id: string, name: string, email?: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}
}

export const testUser = new User('0', 'John Smith', 'john@example.com');
export const testUser2 = new User('0', 'Will Smith', 'john@example.com');
export const testUser3 = new User('0', 'Kelvin Smith', 'kelvin@example.com');

export const testUserList = [testUser, testUser2, testUser3];
