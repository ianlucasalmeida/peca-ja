"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Instale com `npx shadcn-ui@latest add checkbox`

export default function Configuracoes() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    nome: user?.nome || "",
    imagem: null as File | null,
    metodosPagamento: {
      pix: false,
      cartao: false,
      boleto: false,
    },
    nomeLoja: user?.lojista?.nome_loja || "",
  });

  useEffect(() => {
    if (user?.is_logista && user.lojista) {
      fetch(`/api/lojas/${user.lojista.id}`)
        .then((res) => res.json())
        .then((data) =>
          setForm((prev) => ({
            ...prev,
            metodosPagamento: data.metodosPagamento || { pix: false, cartao: false, boleto: false },
            nomeLoja: data.nome_loja,
          }))
        );
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", form.nome);
    if (form.imagem) formData.append("imagem", form.imagem);
    if (user?.is_logista) {
      formData.append("metodosPagamento", JSON.stringify(form.metodosPagamento));
      formData.append("nomeLoja", form.nomeLoja);
    }

    const res = await fetch(user?.is_logista ? `/api/lojas/${user?.lojista.id}` : `/api/usuarios/${user?.id}`, {
      method: "PUT",
      body: formData,
    });
    if (res.ok) alert("Configurações salvas com sucesso!");
  };

  if (!user) return <div className="min-h-screen p-8">Você precisa estar logado</div>;

  return (
    <div className="min-h-screen p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
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
              <Label htmlFor="imagem">Foto de Perfil</Label>
              <Input
                id="imagem"
                type="file"
                onChange={(e) => setForm({ ...form, imagem: e.target.files?.[0] || null })}
              />
            </div>
            {user.is_logista && (
              <>
                <div>
                  <Label htmlFor="nomeLoja">Nome da Loja</Label>
                  <Input
                    id="nomeLoja"
                    value={form.nomeLoja}
                    onChange={(e) => setForm({ ...form, nomeLoja: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Métodos de Pagamento Aceitos</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pix"
                      checked={form.metodosPagamento.pix}
                      onCheckedChange={(checked) =>
                        setForm({
                          ...form,
                          metodosPagamento: { ...form.metodosPagamento, pix: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="pix">Pix</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cartao"
                      checked={form.metodosPagamento.cartao}
                      onCheckedChange={(checked) =>
                        setForm({
                          ...form,
                          metodosPagamento: { ...form.metodosPagamento, cartao: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="cartao">Cartão</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="boleto"
                      checked={form.metodosPagamento.boleto}
                      onCheckedChange={(checked) =>
                        setForm({
                          ...form,
                          metodosPagamento: { ...form.metodosPagamento, boleto: checked as boolean },
                        })
                      }
                    />
                    <Label htmlFor="boleto">Boleto</Label>
                  </div>
                </div>
              </>
            )}
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}