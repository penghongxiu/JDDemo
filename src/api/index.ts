import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { getToken, AI_TOKEN_KEY } from './token';
import { debounce } from 'src/common/utils/util';
axios.defaults.withCredentials = true;
const api = axios.create({
	baseURL: '/',
	timeout: 100000,
	headers: {
		'x-requested-with': 'XMLHttpRequest',
	},
	withCredentials: true
});

const duration = 3;

const toastError = debounce((msg: string) => {
    message.error(msg, duration);
},200)


api.interceptors.request.use(conf => {
	const token = getToken();
	// post 请求
	if (conf.method === 'post') {
		// 没有显式设置'Content-Type'
		if (!conf.headers['Content-Type']) {
			conf.headers['Content-Type'] = 'application/json';
		}
	}
	/*解决前端发axios请求传输数据参数给后端时，请求路径中的数组参数带中括号[]报400问题*/
	conf.paramsSerializer = (params) => {
        //@ts-ignore
		return qs.stringify(params, { arrayFormat: conf.arrayFormat || "none" });
	};
    // 设置token 响应头
    if(token) {
        conf.headers[AI_TOKEN_KEY] = token;
    }
	return conf;
}, err => {
	return Promise.reject(err);
});


api.interceptors.response.use(res => {
	const token = getToken();
	// post 请求增加一次查询状态的请求
	if(res.config.method === 'post' && token) {
		// loadConfig();
	}
	try {
		if(res.data.code === 105) {
            message.error('魔豆不够啦，下个更新见', duration);
			return res.data
		}

		if (!res.data) return null;
		return res.data;

	} catch (error) {
		return res.data;
	}
}, err => {
	console.log('err', err);
	toastError('哎呀！出了点问题。请检查您的网络或重试！');
	if (axios.isCancel(err)) {
		return Promise.reject(err);
	}
	return Promise.reject({type: '1'});
});

export { api }

