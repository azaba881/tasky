"use client";

import { Button } from "../ui/button";
import { useLanguage } from "@/hooks/use-language";

export default function Cta() {
    const { t } = useLanguage();

    return (
        <div>
            <section className="py-10 pb-20">
                <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {t.cta.title}
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {t.cta.description}
                    </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                        {t.cta.button}
                    </Button>              
                    </div>
                </div>
                </div>
            </section>
        </div>
    )
}