"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { AuthLayout } from "@/components/auth-layout";
import { User, Mail, Lock, Phone, Store, Upload } from "lucide-react";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    is_logista: false,
    nome_loja: "",
    imagem: null as File | null,
  });
  const [telefoneErro, setTelefoneErro] = useState("");

  const aplicarMascaraTelefone = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros.length <= 10) {
      return apenasNumeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return apenasNumeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  const validarTelefone = (telefone: string) => {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(telefone);
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const telefoneMascarado = aplicarMascaraTelefone(valor);
    setForm({ ...form, telefone: telefoneMascarado });
    setTelefoneErro("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarTelefone(form.telefone)) {
      setTelefoneErro("Telefone deve estar no formato (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && key !== 'imagem') {
          formData.append(key, String(value));
        }
      });
      if (form.imagem) formData.append("imagem", form.imagem);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao realizar cadastro');
    }
  };

  return (
    <AuthLayout 
      title="Criar Conta" 
      subtitle="Preencha os dados abaixo para começar"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="nome"
              placeholder="Seu nome completo"
              className="pl-10"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
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
          <Label htmlFor="senha">Senha</Label>
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

        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="telefone"
              placeholder="(XX) 9XXXX-XXXX"
              className="pl-10"
              value={form.telefone}
              onChange={handleTelefoneChange}
            />
          </div>
          {telefoneErro && (
            <p className="text-destructive text-sm">{telefoneErro}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_logista"
            checked={form.is_logista}
            onCheckedChange={(checked) => 
              setForm({ ...form, is_logista: checked as boolean })
            }
          />
          <Label htmlFor="is_logista" className="text-sm font-medium">
            Sou Lojista
          </Label>
        </div>

        {form.is_logista && (
          <div className="space-y-2">
            <Label htmlFor="nome_loja">Nome da Loja</Label>
            <div className="relative">
              <Store className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="nome_loja"
                placeholder="Nome da sua loja"
                className="pl-10"
                value={form.nome_loja}
                onChange={(e) => setForm({ ...form, nome_loja: e.target.value })}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="imagem">Foto de Perfil</Label>
          <div className="relative">
            <Upload className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="imagem"
              type="file"
              className="pl-10"
              onChange={(e) => setForm({ ...form, imagem: e.target.files?.[0] || null })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
          Criar Conta
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link 
              href="/login" 
              className="text-primary hover:underline font-medium"
            >
              Fazer Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}