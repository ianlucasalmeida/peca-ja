import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Peça Já</h1>
      <p className="text-lg mb-6">Sua solução ágil para autopeças!</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/cadastro">Cadastrar</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}