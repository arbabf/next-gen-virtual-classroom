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

export const testUser = new User("0", "John Smith", "john@example.com");