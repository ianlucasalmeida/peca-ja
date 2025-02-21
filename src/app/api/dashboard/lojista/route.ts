import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const usuarioId = Number(searchParams.get("usuarioId"));

  const lojista = await prisma.lojista.findUnique({
    where: { usuario_id: usuarioId },
    include: { usuario: true },
  });

  if (!lojista) {
    return NextResponse.json({ error: "Lojista não encontrado" }, { status: 404 });
  }

  // Métricas fictícias por agora
  const metricas = {
    totalPedidos: 120,
    vendasMes: 45000.00,
    estoqueDisponivel: 300,
  };

  return NextResponse.json({ lojista, metricas }, { status: 200 });
}