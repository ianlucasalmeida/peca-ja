"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary items-center justify-center p-12">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-4">Peça Já</h1>
          <p className="text-white/80 text-lg">
            Sua plataforma completa para encontrar as melhores autopeças do mercado.
            Conectamos você aos melhores fornecedores com agilidade e segurança.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-muted/5">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}