"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Instale com `npx shadcn-ui@latest add select`

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.lojista?.id) {
      fetch(`/api/produtos?lojistaId=${user.lojista.id}`)
        .then((res) => res.json())
        .then(setProdutos);
    }
  }, [user]);

  const handleStatusChange = async (produtoId: number, novoStatus: string) => {
    const res = await fetch(`/api/produtos/${produtoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    });
    if (res.ok) {
      setProdutos(produtos.map((p) => (p.id === produtoId ? { ...p, status: novoStatus } : p)));
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/produtos/${id}`, { method: "DELETE" });
    if (res.ok) setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {produtos.map((produto) => (
          <Card key={produto.id}>
            <CardHeader>
              <CardTitle>{produto.nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={produto.imagem_url} alt={produto.nome} className="w-32 h-32 object-cover mb-2" />
              <p>{produto.descricao}</p>
              <p>Preço: R$ {produto.preco.toFixed(2)}</p>
              <p>Tipo: {produto.tipo}</p>
              <div className="mt-2">
                <Label>Status</Label>
                <Select
                  value={produto.status}
                  onValueChange={(value) => handleStatusChange(produto.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="pausado">Pausado</SelectItem>
                    <SelectItem value="em_falta">Em Falta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-2 space-x-2">
                <Button variant="outline">Editar</Button>
                <Button variant="destructive" onClick={() => handleDelete(produto.id)}>
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}