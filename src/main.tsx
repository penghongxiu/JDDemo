import React from "react";
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from 'src/store';
import Routes from './router';

/**
 * 应用根组件
 * 负责全局状态提供、Ant Design 主题配置及国际化
 */
const App: React.FC = () => {
    // 语言：'en_US'-英文 'zh_CN'-中文
    const locals: string = 'en_US'; 

    return (
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#45C4BE', // 全局主色
                        borderRadius: 4,
                    },
                }}
                locale={locals as any} 
                wave={{ disabled: true }} // 禁用全局点击波纹效果
            >
                <Routes />
            </ConfigProvider>
        </Provider>
    );
}

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(<App />);