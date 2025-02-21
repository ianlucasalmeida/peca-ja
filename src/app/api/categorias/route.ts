import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lojistaId = Number(searchParams.get("lojistaId"));

  const categorias = await prisma.categoria.findMany({
    where: { pecas: { some: { lojista_id: lojistaId } } },
  });

  return NextResponse.json(categorias, { status: 200 });
}