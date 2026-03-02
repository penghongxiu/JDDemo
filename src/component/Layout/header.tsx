import React, {memo} from "react";

import "src/css/components/Layout/header.scss"

const App: React.FC = () => {

    return (
        <div className="layout-header">
            页头
        </div>
    );
}


export default memo(App);
