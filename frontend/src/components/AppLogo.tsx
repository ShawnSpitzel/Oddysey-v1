import React from "react";
import OdysseyLogo from "../assets/images/viking-ship.png";

const AppLogo = () => {
    return (
        <div className="flex items-center gap-2 p-6">
            <div className="flex items-center justify-center h-11 w-12 bg-[#464646] rounded-xl">
                <img src={OdysseyLogo} alt="Odyssey"className="h-6 filter invert items-center justify-center opacity-95"/>
            </div>
            <h1 className="font-semibold text-md text-[#88838A]">Oddysey.ai</h1>
        </div>
    )
};

export default AppLogo;
