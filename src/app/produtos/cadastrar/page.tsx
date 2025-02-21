"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CadastrarProduto() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    tipo: "original",
    imagem: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", form.nome);
    formData.append("descricao", form.descricao);
    formData.append("preco", form.preco);
    formData.append("tipo", form.tipo);
    formData.append("lojistaId", "1"); // Substitua por ID real do lojista logado
    if (form.imagem) formData.append("imagem", form.imagem);

    const res = await fetch("/api/produtos", {
      method: "POST",
      body: formData,
    });
    if (res.ok) alert("Produto cadastrado com sucesso!");
  };

  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Cadastrar Produto</CardTitle>
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
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="preco">Preço</Label>
              <Input
                id="preco"
                type="number"
                value={form.preco}
                onChange={(e) => setForm({ ...form, preco: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <select
                id="tipo"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="original">Original</option>
                <option value="paralela">Paralela</option>
                <option value="remanufaturada">Remanufaturada</option>
                <option value="desmanche">Desmanche</option>
              </select>
            </div>
            <div>
              <Label htmlFor="imagem">Imagem</Label>
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