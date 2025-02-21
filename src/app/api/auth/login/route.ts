import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, senha } = await req.json();

    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: { lojista: true }, // Inclui dados do lojista, se existir
    });
    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const senhaValida = await compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login bem-sucedido!",
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        is_logista: usuario.is_logista,
        imagem_url: usuario.imagem_url,
        lojista: usuario.lojista ? {
          nome_loja: usuario.lojista.nome_loja,
          imagem_url: usuario.lojista.imagem_url,
        } : null,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}