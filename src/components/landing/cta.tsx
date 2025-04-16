"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";

export default function Cta() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Prêt à booster votre productivité ?
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Rejoignez des milliers d&apos;utilisateurs satisfaits et commencez à mieux gérer votre temps dès aujourd&apos;hui.
                        </p>
                    </div>
                    <SignedOut>
                        <Button asChild size="lg">
                            <Link href="/sign-up">Commencer gratuitement</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </section>
    );
}