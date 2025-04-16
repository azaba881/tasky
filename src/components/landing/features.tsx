"use client";

import { CheckCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default function Features() {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            Fonctionnalités
                        </Badge>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Tout ce dont vous avez besoin pour gérer vos tâches
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Une interface simple et intuitive pour organiser votre travail efficacement
                        </p>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 max-w-5xl mx-auto">
                    <Card className="bg-background border-2 border-muted">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Gestion des tâches</h3>
                                <p className="text-muted-foreground">Créez, modifiez et suivez vos tâches facilement</p>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Création de tâches</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Modification du statut</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Marquage des tâches importantes</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="bg-background border-2 border-primary relative">
                        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full">
                            Populaire
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Vue Calendrier</h3>
                                <p className="text-muted-foreground">Visualisez vos tâches dans un calendrier</p>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Vue mensuelle</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Navigation intuitive</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Affichage des tâches par date</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="bg-background border-2 border-muted">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Statistiques</h3>
                                <p className="text-muted-foreground">Suivez votre progression</p>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Tableau de bord</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Graphiques de progression</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    <span>Statistiques détaillées</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}