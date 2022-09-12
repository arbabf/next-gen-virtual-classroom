import { Capabilities } from "./Capabilities";

export abstract class Role {
	/**
	 * A unique label for the role
	 */
	abstract name: string;
	
	/**
	 * A description of the role
	 */
	abstract description: string;

	/**
	 * The capabilities that this role has
	 */
	abstract capabilities: Capabilities[];
}