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
