export type Response<T> = {
	code: number;
	content: T;
	message: string;
	data?: T
}
export type DataResponse<T> = {
	code: number;
	data: T;
	message: string;
}