"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Menu, X, LayoutDashboard, Package, ShoppingBag, ClipboardList, LogOut } from "lucide-react";

// Types
interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

interface SidebarProps {
  isLojista: boolean;
  user: {
    nome: string;
    imagem_url?: string;
    lojista?: {
      nome_loja: string;
    };
  };
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

// Context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Hooks
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Provider Component
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

// NavItem Component
const NavItem = ({ href, children, icon }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      asChild
      className="w-full justify-start gap-2 hover-primary text-secondary-foreground"
    >
      <Link href={href}>
        {icon}
        {children}
      </Link>
    </Button>
  );
};

// Main Sidebar Component
export function Sidebar({ isLojista, user }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) return null;

  return (
    <div
      className={`
        h-screen fixed top-0 left-0 
        border-r border-border
        bg-sidebar-background
        transition-all duration-300 ease-in-out
        shadow-lg
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {isOpen && (
            <div className="flex items-center space-x-3">
              {user.imagem_url && (
                <div className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-primary">
                  <Image
                    src={user.imagem_url}
                    alt={user.nome}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-sidebar-foreground">
                  {user.nome}
                </h2>
                {isLojista && user.lojista && (
                  <p className="text-sm text-muted-foreground">
                    {user.lojista.nome_loja}
                  </p>
                )}
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="hover-secondary"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <Separator className="my-2 bg-sidebar-border" />

        {/* Navigation */}
        {isOpen && (
          <ScrollArea className="flex-grow px-1">
            <nav className="space-y-2">
              {isLojista ? (
                <>
                  <NavItem href="/dashboard/lojista" icon={<LayoutDashboard size={20} />}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/produtos/cadastrar" icon={<Package size={20} />}>
                    Cadastrar Produto
                  </NavItem>
                  <NavItem href="/produtos/listar" icon={<ClipboardList size={20} />}>
                    Gerenciar Produtos
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem href="/produtos" icon={<ShoppingBag size={20} />}>
                    Produtos
                  </NavItem>
                  <NavItem href="/meus-pedidos" icon={<ClipboardList size={20} />}>
                    Meus Pedidos
                  </NavItem>
                </>
              )}
            </nav>
          </ScrollArea>
        )}

        {/* Footer */}
        {isOpen && (
          <>
            <Separator className="my-2 bg-sidebar-border" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive/90"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Sair
            </Button>
          </>
        )}
      </div>
    </div>
  );
}