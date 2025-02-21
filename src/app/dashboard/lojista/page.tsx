"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardLojista() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.id) {
      setError("Usuário não autenticado");
      return;
    }

    fetch(`/api/dashboard/lojista?usuarioId=${user.id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setData(response);
        }
      })
      .catch((err) => setError("Erro ao carregar dados"));
  }, [user]);

  if (error) return <div className="min-h-screen p-8">Erro: {error}</div>;
  if (!data) return <div className="min-h-screen p-8">Carregando...</div>;
  if (!data.lojista) return <div className="min-h-screen p-8">Nenhuma loja associada</div>;

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