import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const loja = await prisma.lojista.findUnique({
    where: { id },
  });

  if (!loja) {
    return NextResponse.json({ error: "Loja não encontrada" }, { status: 404 });
  }

  return NextResponse.json(loja, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const formData = await req.formData();
  const nomeLoja = formData.get("nomeLoja") as string;
  const metodosPagamento = JSON.parse(formData.get("metodosPagamento") as string);
  const imagem = formData.get("imagem") as File;

  let imagem_url: string | undefined;
  if (imagem) {
    const buffer = Buffer.from(await imagem.arrayBuffer());
    const filename = `${Date.now()}-${imagem.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    imagem_url = `/uploads/${filename}`;
  }

  const loja = await prisma.lojista.update({
    where: { id },
    data: {
      nome_loja: nomeLoja,
      metodosPagamento: metodosPagamento as any, // Ajuste o tipo no schema depois
      ...(imagem_url && { imagem_url }),
    },
  });

  return NextResponse.json(loja, { status: 200 });
}