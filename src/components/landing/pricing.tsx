import { CheckCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function Pricing(){
    return (
        <div>
            <section id="pricing" className="py-10">
                <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Tarifs
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Des forfaits adaptés à vos besoins
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Choisissez le plan qui vous convient, sans engagement.
                    </p>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 max-w-5xl mx-auto">
                    <Card className="bg-background border-2 border-muted">
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Gratuit</h3>
                        <p className="text-muted-foreground">Pour les utilisateurs individuels</p>
                        </div>
                        <div className="flex items-baseline">
                        <span className="text-4xl font-bold">0€</span>
                        <span className="text-muted-foreground ml-1">/mois</span>
                        </div>
                        <ul className="space-y-2">
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Jusqu&apos;à 20 tâches</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Vue calendrier basique</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Rappels par email</span>
                        </li>
                        </ul>
                        <Button className="w-full" variant="outline">
                        Commencer gratuitement
                        </Button>
                    </CardContent>
                    </Card>
                    <Card className="bg-background border-2 border-primary relative">
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full">
                        Populaire
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Pro</h3>
                        <p className="text-muted-foreground">Pour les professionnels</p>
                        </div>
                        <div className="flex items-baseline">
                        <span className="text-4xl font-bold">9,99€</span>
                        <span className="text-muted-foreground ml-1">/mois</span>
                        </div>
                        <ul className="space-y-2">
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Tâches illimitées</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Vue calendrier avancée</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Statistiques détaillées</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Rappels par SMS et email</span>
                        </li>
                        </ul>
                        <Button className="w-full">Essai gratuit de 14 jours</Button>
                    </CardContent>
                    </Card>
                    <Card className="bg-background border-2 border-muted">
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Entreprise</h3>
                        <p className="text-muted-foreground">Pour les équipes</p>
                        </div>
                        <div className="flex items-baseline">
                        <span className="text-4xl font-bold">24,99€</span>
                        <span className="text-muted-foreground ml-1">/mois</span>
                        </div>
                        <ul className="space-y-2">
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Tout ce qui est inclus dans Pro</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Collaboration en équipe</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Intégrations avancées</span>
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>Support prioritaire</span>
                        </li>
                        </ul>
                        <Button className="w-full" variant="outline">
                        Contacter les ventes
                        </Button>
                    </CardContent>
                    </Card>
                </div>
                </div>
            </section>
        </div>
    )
}