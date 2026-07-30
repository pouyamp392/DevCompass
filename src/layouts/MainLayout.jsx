import { Outlet } from "react-router-dom";

import BottomDock from "./BottomDock";

import Secene from "../components/ui/Scene"

export default function MainLayout() {

    return (
        <>
         <style>{
            `
            body{
            padding-bottom : 5rem;
            }
            `
            }
         </style>

            <Outlet />

            <Secene variant="mainLayout" />

            <BottomDock />

        </>
    );
}