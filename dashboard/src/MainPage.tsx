import { Outlet } from "react-router-dom"
import { Sidebar } from "./components/layout/Sidebar"


export const MainPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="p-2 ml-[var(--sidebar-width)]">
                <Outlet />
            </div>
        </div>
    )
}