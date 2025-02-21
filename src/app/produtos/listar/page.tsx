"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/produtos?lojistaId=1") // Substitua por ID real
      .then((res) => res.json())
      .then(setProdutos);
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/produtos/${id}`, { method: "DELETE" });
    if (res.ok) setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <div>
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
