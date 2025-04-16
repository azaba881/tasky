"use client";

import { BarChart2, Calendar, CheckCircle, Star, Users, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useLanguage } from "@/hooks/use-language";

export default function Features() {
    const { t } = useLanguage();

    // Vérifier si les traductions sont des chaînes de caractères ou des objets
    const featuresText = typeof t.features === 'string' ? t.features : 'Features';
    const featuresTitle = t.features && typeof t.features.title === 'string' ? t.features.title : 'Everything you need';
    const featuresDescription = t.features && typeof t.features.description === 'string' ? t.features.description : 'Tasky combines the best tools to help you stay organized and productive.';
    
    // Vérifier les sous-sections
    const taskManagementTitle = t.features && t.features.taskManagement && typeof t.features.taskManagement.title === 'string' 
        ? t.features.taskManagement.title 
        : 'Task Management';
    const taskManagementDescription = t.features && t.features.taskManagement && typeof t.features.taskManagement.description === 'string' 
        ? t.features.taskManagement.description 
        : 'Create, organize, and track your tasks with an intuitive interface.';
    
    const calendarTitle = t.features && t.features.calendar && typeof t.features.calendar.title === 'string' 
        ? t.features.calendar.title 
        : 'Calendar View';
    const calendarDescription = t.features && t.features.calendar && typeof t.features.calendar.description === 'string' 
        ? t.features.calendar.description 
        : 'Visualize your tasks in a calendar to better plan your time.';
    
    const prioritiesTitle = t.features && t.features.priorities && typeof t.features.priorities.title === 'string' 
        ? t.features.priorities.title 
        : 'Priority Tasks';
    const prioritiesDescription = t.features && t.features.priorities && typeof t.features.priorities.description === 'string' 
        ? t.features.priorities.description 
        : 'Mark important tasks to never miss what really matters.';
    
    const statsTitle = t.features && t.features.stats && typeof t.features.stats.title === 'string' 
        ? t.features.stats.title 
        : 'Detailed Statistics';
    const statsDescription = t.features && t.features.stats && typeof t.features.stats.description === 'string' 
        ? t.features.stats.description 
        : 'Track your productivity with clear graphs and statistics.';
    
    const collaborationTitle = t.features && t.features.collaboration && typeof t.features.collaboration.title === 'string' 
        ? t.features.collaboration.title 
        : 'Collaboration';
    const collaborationDescription = t.features && t.features.collaboration && typeof t.features.collaboration.description === 'string' 
        ? t.features.collaboration.description 
        : 'Share tasks and collaborate with your team in real-time.';
    
    const remindersTitle = t.features && t.features.reminders && typeof t.features.reminders.title === 'string' 
        ? t.features.reminders.title 
        : 'Smart Reminders';
    const remindersDescription = t.features && t.features.reminders && typeof t.features.reminders.description === 'string' 
        ? t.features.reminders.description 
        : 'Receive notifications to never miss an important deadline.';

    return (
        <div>
            <section id="features" className="py-20">
                <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {featuresText}
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {featuresTitle}
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {featuresDescription}
                    </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{taskManagementTitle}</h3>
                        <p className="text-muted-foreground">
                        {taskManagementDescription}
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{calendarTitle}</h3>
                        <p className="text-muted-foreground">
                        {calendarDescription}
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <Star className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{prioritiesTitle}</h3>
                        <p className="text-muted-foreground">
                        {prioritiesDescription}
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <BarChart2 className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{statsTitle}</h3>
                        <p className="text-muted-foreground">
                        {statsDescription}
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <Users className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{collaborationTitle}</h3>
                        <p className="text-muted-foreground">
                        {collaborationDescription}
                        </p>
                    </CardContent>
                    </Card>
                    <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                        <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{remindersTitle}</h3>
                        <p className="text-muted-foreground">
                        {remindersDescription}
                        </p>
                    </CardContent>
                    </Card>
                </div>
                </div>
            </section>
        </div>
    )
}