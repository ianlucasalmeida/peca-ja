"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Produtos() {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const res = await fetch(`/api/produtos?busca=${busca}&status=ativo`);
    const data = await res.json();
    setProdutos(data);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProdutos();
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Produtos Disponíveis</h1>
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <Input
          placeholder="Pesquisar peças..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <Button type="submit">Pesquisar</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <Card key={produto.id}>
              <CardHeader>
                <CardTitle>{produto.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tipo: {produto.tipo}</p>
                <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                <p>Loja: {produto.lojista.nome_loja}</p>
                <Button className="mt-2" variant="outline">
                  Comprar
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}