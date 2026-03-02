import React from "react";
import { createRoot } from 'react-dom/client';
import {ConfigProvider} from 'antd';
import {Provider} from 'react-redux';
import store from 'src/store';
import Routes from './router';


const App: React.FC = () => {

    let locals: any = 'en_US';//语言：'en_US'-英文 'zh_CN'-中文

    return (
        // <React.StrictMode>
            <Provider store={store}>
                <ConfigProvider
                    theme={{
                        token: {
                            // Seed Token，影响范围大
                            colorPrimary: '#45C4BE',
                            borderRadius: 4,

                            // 派生变量，影响范围小
                            // colorBgContainer: '#f6ffed',
                        },
                    }}
                    locale={locals} //
                    wave={{ disabled: true }} //关闭点击波纹效果
                >
                    <Routes/>
                </ConfigProvider>
            </Provider>
        // </React.StrictMode>
    );
}

// ReactDOM.render(<App/>, document.getElementById("root") as HTMLElement);
const container: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(<App />);
