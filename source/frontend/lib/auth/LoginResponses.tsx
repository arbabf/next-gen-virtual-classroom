import { AuthFlow } from "./AuthFlow";

export type EmailFlowResponse = {
	id: string;
	flow: AuthFlow;
}