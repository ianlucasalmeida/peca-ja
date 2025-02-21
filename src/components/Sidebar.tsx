// src/components/Sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({ isLojista, user }: { isLojista: boolean; user: any }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Card className="h-screen w-64 fixed top-0 left-0 p-4">
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
        <h2 className="text-xl font-bold">Bem-vindo, {user.nome}</h2>
      </div>
      <nav className="space-y-2">
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
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          Sair
        </Button>
      </nav>
    </Card>
  );
}