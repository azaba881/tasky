import { BarChart2, Calendar, CheckCircle, Star, Users, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default function Features(){
    return (
        <div>
            <section id="features" className="py-20">
                <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Fonctionnalités
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Tout ce dont vous avez besoin
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Tasky combine les meilleurs outils pour vous aider à rester organisé et productif.
                    </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Gestion des tâches</h3>
                        <p className="text-muted-foreground">
                        Créez, organisez et suivez vos tâches avec une interface intuitive.
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Vue calendrier</h3>
                        <p className="text-muted-foreground">
                        Visualisez vos tâches dans un calendrier pour mieux planifier votre temps.
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <Star className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Tâches prioritaires</h3>
                        <p className="text-muted-foreground">
                        Marquez les tâches importantes pour ne jamais manquer ce qui compte vraiment.
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <BarChart2 className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Statistiques détaillées</h3>
                        <p className="text-muted-foreground">
                        Suivez votre productivité avec des graphiques et des statistiques claires.
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <Users className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Collaboration</h3>
                        <p className="text-muted-foreground">
                        Partagez des tâches et collaborez avec votre équipe en temps réel.
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Rappels intelligents</h3>
                        <p className="text-muted-foreground">
                        Recevez des notifications pour ne jamais manquer une échéance importante.
                        </p>
                    </CardContent>
                    </Card>
                </div>
                </div>
            </section>
        </div>
    )
}