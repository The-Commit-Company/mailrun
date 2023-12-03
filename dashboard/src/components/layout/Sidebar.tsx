import { ReactNode } from "react"
import { Users, Mails } from 'lucide-react'
import { NavLink } from "react-router-dom"

const ICON_SIZE = '16'
export const Sidebar = () => {
    return (
        <nav className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)]
        bg-slate-50 dark:bg-slate-900">
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2 p-2">
                    <div>
                        <h1 className="text-2xl pl-2">mailrun</h1>
                    </div>
                    <nav className="flex flex-col gap-0.5">
                        <SidebarItem icon={<Users size={ICON_SIZE} />} label='Audience' path='audience' />
                        <SidebarItem icon={<Mails size={ICON_SIZE} />} label='Newsletters' path='newsletters' />
                    </nav>
                </div>

                {/* Sidebar footer goes here */}
            </div>
        </nav>
    )
}


export const SidebarItem = ({ path, icon, label }: { icon: ReactNode, label: string, path: string }) => {
    return <NavLink to={path}
        className={({ isActive }) => `flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 hover:text-gray-800 dark:hover:text-gray-50 dark:hover:bg-slate-800 ${isActive ? 'bg-slate-200 text-gray-800 dark:text-gray-50' : 'text-gray-600 dark:text-gray-100'}`}>
        {icon}
        <span className="text-sm">{label}</span>
    </NavLink>
}