"use client"

import { LuLayoutDashboard, LuCalendar, LuUsers } from "react-icons/lu";

import { authClient } from "@/lib/auth-client"

export function Sidebar() {
  const { data } = authClient.useSession();

  if (!data?.user) {
    return null;
  }

  return (
    <div className="flex-1 max-w-[220px] flex flex-col bg-white">
      <div className="flex items-center gap-2 !p-4 border-b-1 border-b-[#eee]">
        <img
          src="/images/icon_apae.png"
          alt="Logo APAE"
          loading="lazy"
          className="w-full max-w-12"
        />

        <h2 className="font-bold">APAE - Barreiros</h2>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="">
          <div className="">
            <span>Menu Principal</span>

            <ul>
              <li>
                <button>
                  <LuLayoutDashboard />

                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button>
                  <LuCalendar />

                  <span>Agendamentos</span>
                </button>
              </li>
              <li>
                <button>
                  <LuUsers />

                  <span>Pacientes</span>
                </button>
              </li>
              <li>
                <button>
                  <LuUsers />

                  <span>Médicos</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <footer>
          <button>
            <div className="">
              <span>{data?.user?.name[0]}</span>
            </div>

            <div>
              <strong>{data?.user?.name}</strong>
              <span>{data?.user?.email}</span>
            </div>
          </button>
        </footer>
      </div>
    </div>
  )
}
