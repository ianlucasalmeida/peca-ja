import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.peca.delete({ where: { id } });
  return NextResponse.json({ message: "Produto excluído" }, { status: 200 });
}