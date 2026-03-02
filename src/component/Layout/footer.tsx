import React, {memo} from "react";

import "src/css/components/Layout/footer.scss"

const fullYear = new Date()?.getFullYear();
const App: React.FC = () => {

    return (
        <div className="layout-footer">
            <p>Copyright © 1998-{fullYear} <a href="//www.focuschina.com/" rel="nofollow" target="_blank"> Focus Technology Co., Ltd. </a>All Rights Reserved.</p>
        </div>
    );
}


export default memo(App);
