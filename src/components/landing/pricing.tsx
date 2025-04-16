"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Tarifs simples et transparents
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Choisissez le plan qui correspond à vos besoins. Pas de frais cachés.
            </p>
          </div>
        </div>
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Plan Gratuit */}
          <Card>
            <CardHeader>
              <CardTitle>Gratuit</CardTitle>
              <CardDescription>Pour les utilisateurs individuels</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold">0€</span>
                <span className="text-gray-500 dark:text-gray-400">/mois</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Jusqu&apos;à 10 tâches</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Fonctionnalités de base</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Vue calendrier</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <SignedOut>
                <Button asChild className="w-full">
                  <Link href="/sign-up">Commencer gratuitement</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button asChild className="w-full">
                  <Link href="/dashboard">Accéder au tableau de bord</Link>
                </Button>
              </SignedIn>
            </CardFooter>
          </Card>
          {/* Plan Pro */}
          <Card>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Pour les professionnels</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold">9.99€</span>
                <span className="text-gray-500 dark:text-gray-400">/mois</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Tâches illimitées</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Toutes les fonctionnalités</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Support prioritaire</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <SignedOut>
                <Button asChild className="w-full">
                  <Link href="/sign-up">Commencer l&apos;essai gratuit</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button asChild className="w-full">
                  <Link href="/dashboard">Accéder au tableau de bord</Link>
                </Button>
              </SignedIn>
            </CardFooter>
          </Card>
          {/* Plan Entreprise */}
          <Card>
            <CardHeader>
              <CardTitle>Entreprise</CardTitle>
              <CardDescription>Pour les grandes équipes</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold">Sur mesure</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Tout du plan Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Intégration personnalisée</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Support dédié 24/7</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="mailto:contact@tasky.com">Nous contacter</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}