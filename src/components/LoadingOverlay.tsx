"use client"

import { SyncLoader } from 'react-spinners';
// need to install react-spinners for this component to work
// with docker - must shut down, clear volumes, and rebuild / spinup all containers
import PuffLoader from 'react-spinners/PuffLoader';

// included this here and not in quotes.model.ts so that LoadingOverlay component is easily reusable in other apps
interface LoadingOverlayProps {
    show?:boolean;
    showSpinner?:boolean    
    spinnerColor?:string;
    bgColor?:string;
}

export default function LoadingOverlay({show = true, bgColor = "#000000", spinnerColor = "#FFFFFF", showSpinner = true}:LoadingOverlayProps) {
    return (
        (show)
        ? 
        <div className="flex justify-center items-center max-w-min" style={{backgroundColor:bgColor}}>
            {(showSpinner) ? 
            <SyncLoader 
                color={spinnerColor}
                size={5}
                speedMultiplier={0.5}
                />
            : <div></div>}
        </div>
        : <div></div>
    );
}