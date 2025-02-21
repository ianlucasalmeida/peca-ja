"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CadastrarProduto() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    tipo: "original",
    imagem: null as File | null,
    categoriaId: "",
  });
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    if (user?.lojista?.id) {
      fetch(`/api/categorias?lojistaId=${user.lojista.id}`)
        .then((res) => res.json())
        .then(setCategorias);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", form.nome);
    formData.append("descricao", form.descricao);
    formData.append("preco", form.preco);
    formData.append("tipo", form.tipo);
    formData.append("lojistaId", String(user?.lojista.id));
    if (form.imagem) formData.append("imagem", form.imagem);
    formData.append("categoriaId", form.categoriaId);

    const res = await fetch("/api/produtos", {
      method: "POST",
      body: formData,
    });
    if (res.ok) alert("Produto cadastrado com sucesso!");
  };

  return (
    <div className="p-8">
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
              <Select value={form.tipo} onValueChange={(value) => setForm({ ...form, tipo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Original</SelectItem>
                  <SelectItem value="paralela">Paralela</SelectItem>
                  <SelectItem value="remanufaturada">Remanufaturada</SelectItem>
                  <SelectItem value="desmanche">Desmanche</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={form.categoriaId}
                onValueChange={(value) => setForm({ ...form, categoriaId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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