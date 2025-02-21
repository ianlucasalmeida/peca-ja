"use client";

import { useAuth } from "@/context/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex">
        {user && <Sidebar isLojista={user.is_logista} user={user} />}
        <main className={user ? "flex-1 ml-64 p-4" : "w-full p-0"}>{children}</main>
      </div>
    </SidebarProvider>
  );
}