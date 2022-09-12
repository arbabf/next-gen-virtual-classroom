import { Capabilities } from "./Capabilities";
import { DefaultCapabilities } from "./DefaultCapabilities";
import { Role } from "./Role";

/**
 * The person hosting the classroom, giving them full administrative privileges.
 */
export class Host extends Role {
	name: string = 'Host';
	description: string = 'Runs the classroom, manages facilitators, and has full admin privileges.';
	capabilities: Capabilities[] = DefaultCapabilities.host;
}