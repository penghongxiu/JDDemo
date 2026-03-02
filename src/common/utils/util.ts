import { chromeExtendDownLink } from "../config";

export function jsonToFormData(json: any, formData = new FormData(), parentKey = '') {
    if(json && typeof json === 'object' && !(json instanceof File)) {
        Object.entries(json).forEach(([key, value]) => {
            if(Array.isArray(value)) {
                value.forEach((el, index) => {
                    const newKey = `${parentKey}${key}[${index}]`;
                    jsonToFormData(el, formData, `${newKey}.`);
                });
            } else if(typeof value === 'object' && value !== null && !(value instanceof File)) {
                jsonToFormData(value, formData, `${parentKey}${key}.`);
            } else {
                // @ts-ignore
                formData.append(`${parentKey}${key}`, value);
            }
        });
    } else {
        formData.append(parentKey, json);
    }
    return formData;
}

/*export const debounce = function (fn, time = 500) {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => {
            // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            fn.apply(this, arguments);
        }, time || 500);
    };
};*/
//防抖函数
export const debounce = function <T extends (...args: any[]) => void>(fn: T, time: number = 500): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;// 创建一个标记用来存放定时器的返回值
    return function (this: unknown, ...args: Parameters<T>): void {
        if (timeout) {
            clearTimeout(timeout);// 每当用户输入的时候把前一个 setTimeout clear 掉
        }
        timeout = setTimeout(() => {
            // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            fn.apply(this, args);
        }, time);
    };
};

export const copyToClipboard = (textToCopy: string, callback: (err?: any) => void) => {
    // navigator clipboard 需要https等安全上下文
    if(navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        return navigator.clipboard.writeText(textToCopy).then(() => { callback && callback() });
    } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // 使text area不在viewport，同时设置不可见
        textArea.style.position = "absolute";
        //@ts-ignore
        textArea.style.opacity = 0;
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        // 执行复制命令并移除文本框
        document.execCommand('copy') ? callback && callback() : undefined;
        textArea.remove();
    }
}

/*判断滚动条是否滚到尾部*/
export function isScrollAtBottom(height: number = 0) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    // 判断是否滚动到底部
    return scrollTop + clientHeight + height >= scrollHeight;
}
function getFormatDate(arg:any) {
    if(arg == undefined || arg == '') {
        return '00';
    }

    let re = arg + '';
    if(re.length < 2) {
        re = '0' + re;
    }

    return re;
}
//时间显示 date:时间 type:1-(年-月-日) 2-(年-月-日 时) 3-(年-月-日 时:分) 4-(年-月) 5-(XXXX年XX月) 其他-(年-月-日 时:分:秒)
export const formatDate = (date: any, type?:string|null, separator = "-") => {
    date = new Date(date)
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();
    let newData = '';
    if(type === '1') {
        newData = `${date.getFullYear()}${separator}${getFormatDate(month)}${separator}${getFormatDate(day)}`;
    } else if(type === '2') {
        newData = `${date.getFullYear()}${separator}${getFormatDate(month)}${separator}${getFormatDate(day)} ${getFormatDate(hour)}`;
    } else if(type === '3') {
        newData = `${date.getFullYear()}${separator}${getFormatDate(month)}${separator}${getFormatDate(day)} ${getFormatDate(hour)}:${getFormatDate(minute)}`;
    } else if(type === '4') {
        newData = `${date.getFullYear()}${separator}${getFormatDate(month)}`;
    } else if(type === '5') {
        newData = `${date.getFullYear()}年${getFormatDate(month)}月`;
    } else {
        newData = `${date.getFullYear()}${separator}${getFormatDate(month)}${separator}${getFormatDate(day)} ${getFormatDate(hour)}:${getFormatDate(minute)}:${getFormatDate(seconds)}`;
    }
    return newData;
}

export const openLink = (href: string, target?: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = target || '_blank';
    a.click();
}
export const getChromeExtendDom = () => {
    const dom = document.querySelector('.J-mentarc-slot');
    return dom;
}

export const watchChromeExtend = (calback: (hasEsxtend: boolean) => boolean) => {
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(function (mutationsList, observer) {
        const dom = getChromeExtendDom();
        // Use traditional 'for loops' for IE 11
        const flag = calback && calback(!!dom);
        if(flag) {
            observer.disconnect();
        }
      });
    observer.observe(document.body, config);
}

export const handleChromeJudge = () => {
    const dom = getChromeExtendDom();
    if(dom) {
        //@ts-ignore
        dom.click();
    } else {
        openLink(chromeExtendDownLink)
    }
}

export let debugMode = JSON.parse(localStorage?.getItem('debugMode')) || false;

export function toggleDebugger() {
    debugMode = !debugMode;
    localStorage?.setItem('debugMode', JSON.stringify(debugMode));
    console.log(`Debug mode===: ${debugMode ? 'ON' : 'OFF'}`);
}

// 在全局对象上定义 debugger 函数
window.debugger = toggleDebugger;
