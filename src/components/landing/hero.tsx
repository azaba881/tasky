"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Hero() {

    return (
        <section className="w-full py-12 md:py-24 lg:py-12 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                ✨ Simplifiez votre quotidien
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Gérez vos tâches comme jamais auparavant
                            </h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                Tasky vous aide à organiser votre travail, augmenter votre productivité et ne plus jamais manquer une échéance.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <SignedOut>
                                <Button asChild size="lg">
                                    <Link href="/sign-up">Commencer maintenant</Link>
                                </Button>
                            </SignedOut>
                            <SignedIn>
                                <Button asChild size="lg">
                                    <Link href="/dashboard">Aller au tableau de bord</Link>
                                </Button>
                            </SignedIn>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            alt="Hero Light"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:aspect-square dark:hidden"
                            height="550"
                            src="/images/hero-light.png"
                            width="550"
                        />
                        <Image
                            alt="Hero Dark"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:aspect-square hidden dark:block"
                            height="550"
                            src="/images/hero-dark.png"
                            width="550"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}