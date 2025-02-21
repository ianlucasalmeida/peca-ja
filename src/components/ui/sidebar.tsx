// src/components/ui/sidebar.tsx
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

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar({ isLojista, user }: { isLojista: boolean; user: any }) {
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
      className={`h-screen fixed top-0 left-0 border-r bg-background transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4">
        {isOpen && (
          <div className="flex items-center mb-4">
            {user.imagem_url && (
              <Image
                src={user.imagem_url}
                alt={user.nome}
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold">{user.nome}</h2>
              {isLojista && user.lojista && (
                <p className="text-sm text-muted-foreground">{user.lojista.nome_loja}</p>
              )}
            </div>
          </div>
        )}
        <Button variant="ghost" onClick={toggle} className="w-full justify-start">
          {isOpen ? "Fechar" : "Abrir"}
        </Button>
        {isOpen && (
          <>
            <Separator className="my-2" />
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <nav className="space-y-1">
                {isLojista ? (
                  <>
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link href="/dashboard/lojista">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link href="/produtos/cadastrar">Cadastrar Produto</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link href="/produtos/listar">Gerenciar Produtos</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link href="/produtos">Produtos</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link href="/meus-pedidos">Meus Pedidos</Link>
                    </Button>
                  </>
                )}
              </nav>
            </ScrollArea>
            <Separator className="my-2" />
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              Sair
            </Button>
          </>
        )}
      </div>
    </div>
  );
}