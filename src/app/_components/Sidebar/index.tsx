"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuLayoutDashboard, LuCalendar, LuUsers } from "react-icons/lu";

import { authClient } from "@/lib/auth-client"

export function Sidebar() {
  const { data } = authClient.useSession();

  const pathname = usePathname();

  if (!data?.user) {
    return null;
  }


  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LuLayoutDashboard className="text-inherit" />,
    },
    {
      href: "/appointments",
      label: "Agendamentos",
      icon: <LuCalendar className="text-inherit" />,
    },
    {
      href: "/patients",
      label: "Pacientes",
      icon: <LuUsers className="text-inherit" />,
    },
    {
      href: "/doctors",
      label: "Médicos",
      icon: <LuUsers className="text-inherit" />,
    },
  ]

  return (
    <div className="flex-1 max-w-[230px] flex flex-col bg-white">
      <div className="flex items-center gap-2 !p-4 border-b-1 border-b-[#eee]">
        <img
          src="/images/icon_apae.png"
          alt="Logo APAE"
          loading="lazy"
          className="w-full max-w-12"
        />

        <h2 className="font-bold">APAE - Barreiros</h2>
      </div>

      <div className="flex-1 flex flex-col justify-between !p-4">
        <div>
          <div>
            <small className="text-[#ccc]">Menu Principal</small>

            <ul className="flex flex-col gap-2 list-none !mt-2">
              {
                menuItems.map(item => (
                  <li className="w-full" key={item.label}>
                    <Link
                      className={`w-full h-10 flex items-center gap-4 rounded-md !px-2 transition-all duration-300 ease-in ${pathname === item.href && `bg-[rgba(4,138,191,0.2)] !text-[#0476D9]`} hover:bg-[rgba(4,138,191,0.2)] hover:!text-[#0476D9]`}
                      href={item.href}
                    >
                      {item.icon}

                      <span className="!text-inherit">{item.label}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <footer>
          <button className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#ccc]">
              <span>{data?.user?.name[0]}</span>
            </div>

            <div className="flex flex-col items-start">
              <strong className="font-medium">{data?.user?.name}</strong>
              <small className="text-[#ccc]">{data?.user?.email}</small>
            </div>
          </button>
        </footer>
      </div>
    </div>
  )
}
