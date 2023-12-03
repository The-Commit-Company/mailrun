import { ReactNode } from "react"
import { Users, Mails, Newspaper, User, Tags } from 'lucide-react'
import { NavLink } from "react-router-dom"

const ICON_SIZE = '16'
export const Sidebar = () => {
    return (
        <nav className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)]
        bg-slate-50 dark:bg-slate-900">
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-4 p-2 pt-3">
                    <div>
                        <span className="cal-sans text-2xl pl-1.5">mailrun</span>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <div className="flex flex-col gap-0.5">
                            <SidebarHeading label='Mailing' />
                            <SidebarItem icon={<Users size={ICON_SIZE} />} label='Audience' path='audience' />
                            <SidebarItem icon={<Mails size={ICON_SIZE} />} label='Newsletters' path='newsletters' />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <SidebarHeading label='Blogs' />
                            <SidebarItem icon={<Newspaper size={ICON_SIZE} />} label='Posts' path='posts' />
                            <SidebarItem icon={<Tags size={ICON_SIZE} />} label='Categories' path='categories' />
                            <SidebarItem icon={<User size={ICON_SIZE} />} label='Authors' path='authors' />
                        </div>
                    </nav>
                </div>

                {/* Sidebar footer goes here */}
            </div>
        </nav>
    )
}


const SidebarItem = ({ path, icon, label }: { icon: ReactNode, label: string, path: string }) => {
    return <NavLink to={path}
        className={({ isActive }) => `flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 hover:text-gray-800 dark:hover:text-gray-50 dark:hover:bg-slate-800 ${isActive ? 'bg-slate-200 text-gray-800 dark:text-gray-50' : 'text-gray-600 dark:text-gray-100'}`}>
        {icon}
        <span className="text-sm">{label}</span>
    </NavLink>
}

const SidebarHeading = ({ label }: { label: string }) => {
    return <span className="text-xs cal-sans px-1.5 py-1 text-gray-600 dark:text-gray-400 uppercase font-bold">{label}</span>
}