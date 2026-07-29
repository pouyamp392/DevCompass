import { NavLink } from "react-router-dom";

import {
    HiOutlineHome,
    HiOutlineMap,
    HiOutlineTrophy,
    HiOutlineUser,
    HiOutlineBookOpen,
    HiOutlineCog6Tooth
} from "react-icons/hi2";

import {
    HiHome,
    HiMap,
    HiTrophy,
    HiUser,
    HiBookOpen,
    HiCog6Tooth
} from "react-icons/hi2";

export default function BottomDock() {

    const items = [
        {
            to: "/dashboard",
            icon: HiOutlineHome,
            activeIcon: HiHome,
            label: "خانه",
            description: "داشبورد"
        },
        {
            to: "/roadmap",
            icon: HiOutlineMap,
            activeIcon: HiMap,
            label: "نقشه راه",
            description: "مسیر یادگیری"
        },
        {
            to: "/skills",
            icon: HiOutlineBookOpen,
            activeIcon: HiBookOpen,
            label: "مهارت‌ها",
            description: "همه مهارت‌ها"
        },
        {
            to: "/achievements",
            icon: HiOutlineTrophy,
            activeIcon: HiTrophy,
            label: "دستاوردها",
            description: "پیشرفت‌ها"
        },
        {
            to: "/profile",
            icon: HiOutlineUser,
            activeIcon: HiUser,
            label: "پروفایل",
            description: "حساب کاربری"
        }
    ];

    return (
        <div className="fixed bottom-4 left-0 right-0 z-[999] flex justify-center px-4">
            <div className="
                relative
                flex
                items-center
                gap-2
                px-4
                py-3
                rounded-3xl
                border
                border-white/10
                bg-black/60
                backdrop-blur-2xl
                shadow-2xl
                shadow-cyan-500/10
                max-w-[600px]
                w-full
            ">
                {items.map((item, index) => {
                    const Icon = item.icon;
                    const ActiveIcon = item.activeIcon;

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `
                                relative
                                flex
                                flex-col
                                items-center
                                justify-center
                                gap-0.5
                                px-3
                                py-2
                                rounded-2xl
                                transition-all
                                duration-300
                                group
                                flex-1
                                ${isActive
                                    ? 'text-cyan-400'
                                    : 'text-zinc-500 hover:text-white'
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    {/* پس‌زمینه اکتیو */}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl border border-cyan-400/20" />
                                    )}

                                    {/* آیکون */}
                                    <div className="relative z-10">
                                        {isActive ? (
                                            <ActiveIcon 
                                                size={24} 
                                                className="drop-shadow-lg shadow-cyan-400/50"
                                            />
                                        ) : (
                                            <Icon size={22} />
                                        )}
                                    </div>

                                    {/* لیبل */}
                                    <span className={`
                                        relative z-10
                                        text-[10px]
                                        font-bold
                                        transition-all
                                        duration-300
                                        ${isActive 
                                            ? 'text-cyan-400 scale-105' 
                                            : 'text-zinc-500 group-hover:text-white'
                                        }
                                    `}>
                                        {item.label}
                                    </span>

                                    {/* نقطه فعال */}
                                    {isActive && (
                                        <div className="absolute -top-1 w-1 h-1 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
}