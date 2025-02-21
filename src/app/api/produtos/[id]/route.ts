import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.peca.delete({ where: { id } });
  return NextResponse.json({ message: "Produto excluído" }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { status } = await req.json();

  const produto = await prisma.peca.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(produto, { status: 200 });
}