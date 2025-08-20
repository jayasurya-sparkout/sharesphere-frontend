'use client';

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/cookies";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        const token = getCookie("userLoggedIn");
        if (token) {
            setShowSidebar(true);
        }
    }, []);

    if (!mounted) return null;

  return (
    <SidebarProvider className="!bg-indigo-200"
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 16)",
            } as React.CSSProperties
          }
        >
        {showSidebar && <AppSidebar variant="inset" />}
        <SidebarInset>
            {showSidebar && <SiteHeader />}
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:p-6">
                  {children}
                </div>
              </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}