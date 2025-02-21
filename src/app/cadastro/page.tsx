// src/app/cadastro/page.tsx
"use client";

import { useState } from "react";
import InputMask from "react-input-mask";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const validarTelefone = (telefone: string) => {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(telefone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarTelefone(form.telefone)) {
      setTelefoneErro("Telefone deve estar no formato (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX");
      return;
    }

    const formData = new FormData();
    formData.append("nome", form.nome);
    formData.append("email", form.email);
    formData.append("senha", form.senha);
    formData.append("telefone", form.telefone);
    formData.append("is_logista", String(form.is_logista));
    if (form.is_logista) formData.append("nome_loja", form.nome_loja);
    if (form.imagem) formData.append("imagem", form.imagem);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) alert("Cadastro realizado com sucesso!");
    else alert(data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                value={form.senha}
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <InputMask
                mask="(99) 99999-9999"
                value={form.telefone}
                onChange={(e) => {
                  setForm({ ...form, telefone: e.target.value });
                  setTelefoneErro("");
                }}
              >
                {(inputProps: any) => (
                  <Input {...inputProps} id="telefone" placeholder="(XX) 9XXXX-XXXX" />
                )}
              </InputMask>
              {telefoneErro && <p className="text-red-500 text-sm">{telefoneErro}</p>}
            </div>
            <div>
              <Label htmlFor="is_logista">Sou Lojista?</Label>
              <input
                id="is_logista"
                type="checkbox"
                checked={form.is_logista}
                onChange={(e) => setForm({ ...form, is_logista: e.target.checked })}
              />
            </div>
            {form.is_logista && (
              <div>
                <Label htmlFor="nome_loja">Nome da Loja</Label>
                <Input
                  id="nome_loja"
                  value={form.nome_loja}
                  onChange={(e) => setForm({ ...form, nome_loja: e.target.value })}
                />
              </div>
            )}
            <div>
              <Label htmlFor="imagem">Foto de Perfil</Label>
              <Input
                id="imagem"
                type="file"
                onChange={(e) => setForm({ ...form, imagem: e.target.files?.[0] || null })}
              />
            </div>
            <Button type="submit">Cadastrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}