import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const senha = formData.get("senha") as string;
  const telefone = formData.get("telefone") as string;
  const is_logista = formData.get("is_logista") === "true";
  const imagem = formData.get("imagem") as File;
  const nome_loja = formData.get("nome_loja") as string;

  let imagem_url: string | undefined;
  if (imagem) {
    const buffer = Buffer.from(await imagem.arrayBuffer());
    const filename = `${Date.now()}-${imagem.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filepath, buffer);
    imagem_url = `/uploads/${filename}`;
  }

  const senha_hash = await hash(senha, 10);
  const usuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha_hash,
      telefone,
      is_logista,
      imagem_url,
      ...(is_logista && {
        lojista: {
          create: {
            nome_loja,
            imagem_url, // Pode separar se quiser imagem diferente
          },
        },
      }),
    },
    include: { lojista: true },
  });

  return NextResponse.json({ message: "Usuário criado com sucesso!", usuario }, { status: 201 });
}