import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const nome = formData.get("nome") as string;
  const descricao = formData.get("descricao") as string;
  const preco = Number(formData.get("preco"));
  const tipo = formData.get("tipo") as string;
  const lojistaId = Number(formData.get("lojistaId"));
  const imagem = formData.get("imagem") as File;

  let imagem_url: string | undefined;
  if (imagem) {
    const buffer = Buffer.from(await imagem.arrayBuffer());
    const filename = `${Date.now()}-${imagem.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filepath, buffer);
    imagem_url = `/uploads/${filename}`;
  }

  const produto = await prisma.peca.create({
    data: {
      nome,
      descricao,
      preco,
      tipo,
      lojista_id: lojistaId,
      imagem_url,
    },
  });

  return NextResponse.json(produto, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lojistaId = Number(searchParams.get("lojistaId"));

  const produtos = await prisma.peca.findMany({
    where: { lojista_id: lojistaId },
  });

  return NextResponse.json(produtos, { status: 200 });
}