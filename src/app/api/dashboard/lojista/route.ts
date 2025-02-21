import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const usuarioId = Number(searchParams.get("usuarioId"));

  console.log("Buscando lojista para usuarioId:", usuarioId);

  const lojista = await prisma.lojista.findUnique({
    where: { usuario_id: usuarioId },
    include: { usuario: true },
  });

  if (!lojista) {
    console.log("Lojista não encontrado para usuarioId:", usuarioId);
    return NextResponse.json({ error: "Lojista não encontrado" }, { status: 404 });
  }

  // Métricas reais
  const totalPedidos = await prisma.pedido.count({
    where: { lojista_id: lojista.id },
  });

  const vendasMes = await prisma.pedido.aggregate({
    where: {
      lojista_id: lojista.id,
      criado_em: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    _sum: { total: true },
  });

  const estoqueDisponivel = await prisma.estoque.aggregate({
    where: { peca: { lojista_id: lojista.id } },
    _sum: { quantidade: true },
  });

  const metricas = {
    totalPedidos,
    vendasMes: vendasMes._sum.total || 0,
    estoqueDisponivel: estoqueDisponivel._sum.quantidade || 0,
  };

  return NextResponse.json({ lojista, metricas }, { status: 200 });
}