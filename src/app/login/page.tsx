"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AuthLayout } from "@/components/auth-layout";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.usuario);
        router.push(data.usuario.is_logista ? "/dashboard/lojista" : "/produtos");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao fazer login');
    }
  };

  return (
    <AuthLayout 
      title="Bem-vindo de volta!" 
      subtitle="Entre com suas credenciais para acessar sua conta"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="pl-10"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="senha" className="text-sm font-medium">
            Senha
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
          Entrar
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link 
              href="/cadastro" 
              className="text-primary hover:underline font-medium"
            >
              Criar Conta
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}