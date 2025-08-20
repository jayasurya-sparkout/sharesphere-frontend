'use client';

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { 
  IconBellRinging, 
  IconUserCircle, 
  IconMailFilled, 
  IconSearch 
} from "@tabler/icons-react";

export function SiteHeader() {
  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails);
      setUser({
        name: parsedDetails.name || "John Doe",
        email: parsedDetails.email || "",
      });
    }
  }, []);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-indigo-100"
        />

        <div className="relative w-64">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="ml-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-5">
              <span className="rounded-2xl bg-indigo-100 px-2 py-2 text-sm text-indigo-600 cursor-pointer">
                <IconMailFilled className="size-4" />
              </span>
              <span className="rounded-2xl bg-indigo-100 px-2 py-2 text-sm text-indigo-600 cursor-pointer">
                <IconBellRinging className="size-4" />
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-6"
            />
            <div className="flex items-center gap-4">
              <span className="rounded-2xl bg-indigo-100 px-2 py-2 text-sm text-indigo-600 cursor-pointer">
                <IconUserCircle className="size-4" />
              </span>
              <span className="">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
