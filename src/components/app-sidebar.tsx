"use client";

import * as React from "react";

import { useEffect } from "react";

import {
  IconChartBar,
  IconDashboard,
  IconInnerShadowTop,
  IconTruckDelivery,
  IconBuildingStore,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconBuildingStore,
    },
    {
      title: "Analytics",
      url: "analytics",
      icon: IconChartBar,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconTruckDelivery,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  const [user, setUser] = React.useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails);
      setUser({
        name: parsedDetails.name,
        email: parsedDetails.email,
      })
    };
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5 text-indigo-600" />
                <span className="text-base font-semibold text-indigo-600">ShareSphere</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
