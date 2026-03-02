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
// 用户输入
interface chatProps {
    input?: string; //输入框
    assistantType: number; //助理类型
    skip?: boolean; //是否跳过
    sessionId?: string;
    operateType: number;
    cardType?: any;
    referenceChatNum?: any;
    timestamp?: any;
    inputData?: string;
}
export const chatApi = (params: chatProps) => {
    return api.post<chatProps, DataResponse<any>>(
        "/menta/chat",
        params,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};

export const checkUserInput = (params: { input: string}) => {
    return api.post<{input: string}, DataResponse<any>>(
        "/menta/sensitive",
        params,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};

// 推送固定场景消息
interface scenarioProps {
    greetingType: number; //意图类型|1-个人助理问候语, 2-选品助理问候语, 3-店铺运营问候语
}
export const getScenario = (params: scenarioProps) => {
    return api.get<scenarioProps, Response<any>>('/menta/greeting', {
        params
    })
}

//获取行业目录的二级目录
interface firstIndustryNameProps {
    firstCategoryName: string; //一级目录名称
}
export const getIndustryList = (params: firstIndustryNameProps) => {
    return api.get<firstIndustryNameProps, Response<any>>('/menta/industry/list', {
        params
    })
}









