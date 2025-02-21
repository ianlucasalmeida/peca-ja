"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardLojista() {
  interface LojistaData {
    lojista: {
      nome_loja: string;
    };
    metricas: {
      totalPedidos: number;
      vendasMes: number;
      estoqueDisponivel: number;
    };
  }

  const [data, setData] = useState<LojistaData | null>(null);

  useEffect(() => {
    // Simulando o ID do usuário logado (você pode passar via contexto ou query)
    const usuarioId = 1; // Substitua por lógica de autenticação real
    fetch(`/api/dashboard/lojista?usuarioId=${usuarioId}`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard - {data.lojista.nome_loja}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{data.metricas.totalPedidos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vendas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">R$ {data.metricas.vendasMes.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estoque Disponível</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{data.metricas.estoqueDisponivel}</p>
          </CardContent>
        </Card>
      </div>
      <Button className="mt-6" onClick={() => alert("Funcionalidade em desenvolvimento")}>
        Ver Detalhes
      </Button>
    </div>
  );
}