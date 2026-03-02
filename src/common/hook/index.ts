import React from "react";
import { useBlocker } from "react-router-dom"
import { watchChromeExtend } from "../utils/util";


const MESSAGE = '您确定要离开吗，系统可能不会保存你的修改'

export const usePrompt = (when: () => boolean, message?: string) => {
    const blocker = useBlocker(({currentLocation,nextLocation,historyAction}) => {
        if(nextLocation.pathname != currentLocation.pathname && when()) {
           const flag = window.confirm(MESSAGE);
           return !flag
        }
        if(nextLocation.pathname === currentLocation.pathname) {
            location.reload();
            return true
        }
        return false
    });
}

export const useHasChrome = () => {
    const [hasChromeExtend, setHasChromeExtend] = React.useState(false);

    React.useEffect(() => {
      let count = 0;
      watchChromeExtend((isExis: boolean) => {
        if(isExis) {
          setHasChromeExtend(true);
          return true
        }
        // 超过10次就不调用了
        count++;
        if(count > 10) {
          return true
        }
        return false
      })
    },[]);

    return hasChromeExtend
}

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth <= 480);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return isMobile;
};