import { api } from ".";
import { Response, DataResponse } from 'src/types/response'
export const AI_TOKEN_KEY = 'umToken';
export const getToken = () => {
    return localStorage.getItem(AI_TOKEN_KEY) || ''
}

export const setToken = (token: string) => {
    console.log('token',token);
    return localStorage.setItem(AI_TOKEN_KEY, token);
}


export const getRemoteToken = () => {
    return api.get<any, DataResponse<any>>(`/menta/get-token`, {
    });
}