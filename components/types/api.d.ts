type APIData<T> = T;
type APIStatus = "success" | "error";
type APIError = {
	error: true;
	message: string;
};

type APIResponse<T> = {
	status: APIStatus;
	data?: APIData<T>;
	error?: APIError;
};

export type { APIData, APIError, APIResponse };