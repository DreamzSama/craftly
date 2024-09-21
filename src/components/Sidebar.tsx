"use client";

import React from "react";
import {
    HomeIcon,
    ChartBarIcon,
    ShoppingBagIcon,
    UserIcon,
    CogIcon,
    InboxIcon,
    ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    link?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text, link }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = link ? pathname === link : false;

    const handleNavigation = () => {
        if (link) {
            router.push(link);
        }
    };

    return (
        <div
            onClick={handleNavigation}
            className={`flex items-center px-4 py-3 rounded-xl cursor-pointer ${
                isActive
                    ? "text-primary bg-primary/10"
                    : "text-grayText hover:text-primary hover:bg-primary/10"
            }`}
        >
            <Icon className="h-6 w-6 mr-3" />
            {text}
        </div>
    );
};

const Sidebar: React.FC = () => {
    return (
        <div className="h-screen w-[300px] border-r-2 bg-white flex flex-col justify-between">
            <div>
                <div className="flex w-64 p-6 mt-4 items-center justify-center">
                    <img
                        src="https://www.projektmagazin.de/sites/default/files/styles/teaser_two_columns_desktop/public/2024-02/awork_logo_dark.png?itok=8wi4rowx"
                        alt="Logo"
                    />
                </div>
                <nav className="mt-10 mx-3 flex flex-col space-y-3">
                    <SidebarItem icon={HomeIcon} link="/home" text="Home" />
                    <SidebarItem icon={ViewColumnsIcon} link="/einsatzplan" text="Einsatzplan" />
                    <SidebarItem icon={ChartBarIcon} link="/projekte" text="Projekte" />
                    <SidebarItem icon={ShoppingBagIcon} link="/lager" text="Lager" />
                    <SidebarItem icon={UserIcon} link="/kontakte" text="Kontakte" />
                    <SidebarItem icon={CogIcon} link="/" text="Settings" />
                    <SidebarItem icon={InboxIcon} link="/" text="Integrations" />
                </nav>
            </div>
            <div className="mb-10 mx-3">
                <SidebarItem icon={ChartBarIcon} text="Activity" />
                <SidebarItem icon={CogIcon} text="Help & Support" />
            </div>
        </div>
    );
};

export default Sidebar;
