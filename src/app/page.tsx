"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Wrench, Clock, Shield, ChevronRight, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="bg-gradient-primary absolute inset-0 opacity-90" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center h-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Peça Já
                <span className="block text-2xl md:text-3xl mt-2 text-secondary/90">
                  Sua solução ágil para autopeças
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Conectamos você aos melhores fornecedores de autopeças do mercado. 
                Encontre as peças que precisa com rapidez e segurança.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-secondary hover:text-white"
                  asChild
                >
                  <Link href="/cadastro">
                    Comece Agora
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link href="/login">
                    Fazer Login
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher o Peça Já?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Package className="h-8 w-8" />}
              title="Amplo Catálogo"
              description="Milhares de peças disponíveis dos melhores fabricantes"
            />
            <FeatureCard
              icon={<Wrench className="h-8 w-8" />}
              title="Qualidade Garantida"
              description="Todas as peças são verificadas e garantidas"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Entrega Rápida"
              description="Sistema otimizado para entregas ágeis"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Compra Segura"
              description="Pagamento seguro e suporte dedicado"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de oficinas e mecânicos que já confiam no Peça Já 
            para suas necessidades de autopeças.
          </p>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
            asChild
          >
            <Link href="/cadastro">
              Criar Conta Gratuita
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 Peça Já. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors">
      <div className="text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}