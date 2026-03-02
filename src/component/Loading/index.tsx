import React from 'react';
import 'src/component/Loading/index.scss';

interface LoadingProps {
    /**
     * 1 - 100 百分比
     * type 类型 circle-小圆圈
     */
    type?: string //类型：默认circle-点点点加载 skeleton-骨架图内容加载 icon-飞鹊图标转圈加载
    width?:string
    size?: string //尺寸默认16px
    iconColorType?: string //图标加载颜色类型：默认：null-主题色 white-白色
}

const App: React.FC = (props: LoadingProps) => {
    const {
        type = "circle",
        width = "fit-content",
        size = "16px",
        iconColorType
    } = props;
    const renderLoadingContent = () => {
        switch(type) {
            case "circle":
                return (
                    <div className="circle-wrap">
                        <div className="circle-item circle-animated" style={{ animationDelay: '0s', opacity: 1 }}></div>
                        <div className="circle-item circle-animated" style={{ animationDelay: '0.2s', opacity: 0.8 }}></div>
                        <div className="circle-item circle-animated" style={{ animationDelay: '0.4s', opacity: 0.4 }}></div>
                    </div>
                );
            case "icon":
                return (<span className={`loading ${iconColorType || ''}`} style={{ width: size, height: size }}></span>);
            default:
                return null
        }
    };

    return renderLoadingContent();
}

export default App;
