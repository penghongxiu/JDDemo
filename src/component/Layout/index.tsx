import React, {memo, useEffect, useRef} from "react";
import {Outlet} from "react-router-dom";
import "src/css/components/Layout/index.scss"

const App: React.FC = () => {
    const cartRef = useRef(null);

    return (
        <div className="layout-container">
            <Outlet context={{ cartRef }} />
        </div>
    );
}


export default memo(App);
