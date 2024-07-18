import type { APIData, APIError, APIResponse } from "../types/api";
import { BareClient } from "@mercuryworkshop/bare-mux";

async function fetch<T>(
	url: string
): Promise<T> {
	const client = new BareClient();
	const response: APIResponse<T> = await client
		.fetch(url)
		.then(({ rawResponse }: { rawResponse: Response }) => rawResponse.json());
	if (response.status === "error") {
		throw { error: true, ...response.error } as APIError;
	}
	return response.data as APIData<T>;
}

export { fetch };