"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function VisualizarLoja() {
  const [loja, setLoja] = useState<any>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`/api/lojas/${id}`)
      .then((res) => res.json())
      .then(setLoja);
  }, [id]);

  if (!loja) return <div className="min-h-screen p-8">Carregando...</div>;

  return (
    <div className="min-h-screen p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{loja.nome_loja}</CardTitle>
        </CardHeader>
        <CardContent>
          {loja.imagem_url && (
            <Image
              src={loja.imagem_url}
              alt={loja.nome_loja}
              width={200}
              height={200}
              className="mb-4"
            />
          )}
          <p>Contato: {loja.contato_loja || "Não informado"}</p>
          <p>CNPJ: {loja.cnpj || "Não informado"}</p>
        </CardContent>
      </Card>
    </div>
  );
}