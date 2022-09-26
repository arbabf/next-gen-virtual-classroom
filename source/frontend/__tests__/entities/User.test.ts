import { User } from "../../entities/User";
import * as Strings from "../utils/strings";
import { validate as validateUUID } from "uuid";

describe('User', () => {
	it('can create user by name', async () => {
		const newUser = new User(Strings.name);

		expect(newUser.name).toBe(Strings.name);
	});

	it('generates a valid UUID', async () => {
		const newUser = new User(Strings.name);

		expect(validateUUID(newUser.id)).toBe(true);
	});

	it('can be made by name, email, and ID', async () => {
		const newUser = new User(Strings.name, Strings.email, Strings.UUID);

		expect(newUser.name).toBe(Strings.name);
		expect(newUser.email).toBe(Strings.email);
		expect(newUser.id).toBe(Strings.UUID);
	});

	it('always has an avatar', async () => {
		const newUser = new User(Strings.name);

		expect(newUser.avatars.length).toBe(1);
	});

	it('always has a preferred avatar', async () => {
		const newUser = new User(Strings.name);

		expect(newUser.preferredAvatar).toBe(newUser.avatars[0].id);
	});
});