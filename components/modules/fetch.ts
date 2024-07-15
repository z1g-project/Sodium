import type { APIData, APIError, APIResponse } from "../types/api";
import { BareClient } from "@mercuryworkshop/bare-mux";

const _fetch = globalThis.fetch;
async function fetch<T>(
	url: string,
	{ backend = true, wisp = false }: { backend?: boolean; wisp?: boolean } = {},
): Promise<T> {
	if (backend) {
		if (!wisp) {
			const response: APIResponse<T> = await _fetch(url).then((response) =>
				response.json(),
			);
			if (response.status === "error") {
				throw { error: true, ...response.error } as APIError;
			}
			return response.data as APIData<T>;
		}

		const client = new BareClient();
		const response: APIResponse<T> = await client
			.fetch(url)
			.then(({ rawResponse }: { rawResponse: Response }) => rawResponse.json());
		if (response.status === "error") {
			throw { error: true, ...response.error } as APIError;
		}
		return response.data as APIData<T>;
	}

	if (wisp) {
		const client = new BareClient();
		// @ts-ignore
		return (await client.fetch(url)).rawResponse as Promise<T>;
	}
	return _fetch(url) as Promise<T>;
}
export { fetch };