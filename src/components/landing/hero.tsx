import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Hero(){
    return (
        <div>
            <section className="py-12">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">✨ Simplifiez votre quotidien</div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Gérez vos tâches comme jamais auparavant
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Tasky vous aide à organiser votre travail, augmenter votre productivité et ne plus jamais manquer
                                une échéance.
                            </p>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg" className="bg-primary hover:bg-primary/90">
                                    <Link href="/sign-up">
                                        Commencer maintenant
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline">
                                    <Link href="/dashboard" className="size-lg">
                                        Allez sur le dashbord
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="mx-auto lg:mx-0 relative order-first lg:order-last">
                            <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
                            <Image width={1000} height={1000}
                                src="/images/hero-light.png"
                                alt="Dashboard Preview"
                                className="w-full h-full dark:hidden mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last border shadow-xl"
                            />   
                            <Image width={1000} height={1000}
                                src="/images/hero-dark.png"
                                alt="Dashboard Preview"
                                className="w-full h-full hidden dark:block mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last border shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}