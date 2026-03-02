import { api } from "src/api";
import {DataResponse, Response} from "src/types/response";

// 获取评价信息
interface evaluationProps {
    msgId?: string;
    bizType?:any;
    bizId?:string;
}
export const evaluationApi = (params: evaluationProps) => {
        return api.get<evaluationProps, DataResponse<any>>(
        "/menta/evaluation",{params}
    );
};
// 进行评价
interface evaluateProps {
    bizId: string;
    bizType: number; //固定0
    evaluateType: number;
    evaluateContent?: string;
}
export const evaluateApi = (params: evaluateProps) => {
    return api.post<evaluateProps, DataResponse<any>>(
        "/menta/evaluate",
        params
    );
};




