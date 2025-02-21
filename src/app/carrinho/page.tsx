"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]); // Estado fictício por agora

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {carrinho.map((item: any) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Preço: R$ {item.preco.toFixed(2)}</p>
                <Button variant="destructive" className="mt-2">
                  Remover
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button>Finalizar Compra</Button>
        </div>
      )}
    </div>
  );
}