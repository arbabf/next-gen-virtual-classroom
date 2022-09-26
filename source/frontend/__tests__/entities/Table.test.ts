import { TableInfo, TableState } from "../../entities/Table";
import { validate as validateUUID } from "uuid";


describe('Table', () => {
	it('can be created with a valid ID', async () => {
		const table = new TableInfo();

		expect(validateUUID(table.id)).toBe(true);
	});

	// currently broken because of circular dependency
	// it('withState is pure', async () => {
	// 	const table = new TableInfo();

	// 	const tableWithState = table.withState(new TableState(table));

	// 	expect(tableWithState).not.toBe(table);
	// });
});