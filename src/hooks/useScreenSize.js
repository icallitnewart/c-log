import { useEffect, useState } from "react";

const useScreenSize = ()=> {
    const [ screenSize, setScreenSize ] = useState(null);

    useEffect(()=> {
        const checkMediaSize = ()=> {
            const MOBILE = window.matchMedia("(max-width: 549px)").matches;
            const TABLET = window.matchMedia("(min-width: 550px) and (max-width: 799px)").matches;
            const WEB = window.matchMedia("(min-width: 800px) and (max-width: 1399px)").matches;
            const MAX = window.matchMedia("(min-width: 1400px)").matches;
            
            (MOBILE) && setScreenSize("mobile");
            (TABLET) && setScreenSize("tablet");
            (WEB) && setScreenSize("web");
            (MAX) && setScreenSize("max");

        };

        checkMediaSize();
        window.addEventListener("resize", checkMediaSize);

        return ()=> window.removeEventListener("resize", checkMediaSize);
    }, []);

    return screenSize;
};

export { useScreenSize };