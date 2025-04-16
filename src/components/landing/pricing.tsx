"use client";

import { CheckCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useLanguage } from "@/hooks/use-language";

export default function Pricing() {
  const { t } = useLanguage();

  // Vérifier si les traductions sont des chaînes de caractères ou des objets
  const pricingText = typeof t.pricing === 'string' ? t.pricing : 'Pricing';
  const pricingTitle = t.pricing && typeof t.pricing.title === 'string' ? t.pricing.title : 'Simple, transparent pricing';
  const pricingDescription = t.pricing && typeof t.pricing.description === 'string' ? t.pricing.description : 'Choose the plan that best fits your needs';
  
  // Vérifier les sous-sections pour le plan gratuit
  const freeTitle = t.pricing && t.pricing.free && typeof t.pricing.free.title === 'string' 
      ? t.pricing.free.title 
      : 'Free';
  const freeSubtitle = t.pricing && t.pricing.free && typeof t.pricing.free.subtitle === 'string' 
      ? t.pricing.free.subtitle 
      : 'For personal use';
  const freePrice = t.pricing && t.pricing.free && typeof t.pricing.free.price === 'string' 
      ? t.pricing.free.price 
      : '$0';
  const freePeriod = t.pricing && t.pricing.free && typeof t.pricing.free.period === 'string' 
      ? t.pricing.free.period 
      : '/month';
  const freeFeatures = t.pricing && t.pricing.free && Array.isArray(t.pricing.free.features) 
      ? t.pricing.free.features 
      : ['Up to 5 projects', 'Basic task management', 'Calendar view'];
  const freeCta = t.pricing && t.pricing.free && typeof t.pricing.free.cta === 'string' 
      ? t.pricing.free.cta 
      : 'Get Started';
  
  // Vérifier les sous-sections pour le plan pro
  const proTitle = t.pricing && t.pricing.pro && typeof t.pricing.pro.title === 'string' 
      ? t.pricing.pro.title 
      : 'Pro';
  const proSubtitle = t.pricing && t.pricing.pro && typeof t.pricing.pro.subtitle === 'string' 
      ? t.pricing.pro.subtitle 
      : 'For professionals';
  const proPrice = t.pricing && t.pricing.pro && typeof t.pricing.pro.price === 'string' 
      ? t.pricing.pro.price 
      : '$9';
  const proPeriod = t.pricing && t.pricing.pro && typeof t.pricing.pro.period === 'string' 
      ? t.pricing.pro.period 
      : '/month';
  const proFeatures = t.pricing && t.pricing.pro && Array.isArray(t.pricing.pro.features) 
      ? t.pricing.pro.features 
      : ['Unlimited projects', 'Advanced task management', 'Priority support', 'Team collaboration'];
  const proCta = t.pricing && t.pricing.pro && typeof t.pricing.pro.cta === 'string' 
      ? t.pricing.pro.cta 
      : 'Subscribe';
  const proPopular = t.pricing && t.pricing.pro && typeof t.pricing.pro.popular === 'string' 
      ? t.pricing.pro.popular 
      : 'Popular';
  
  // Vérifier les sous-sections pour le plan entreprise
  const enterpriseTitle = t.pricing && t.pricing.enterprise && typeof t.pricing.enterprise.title === 'string' 
      ? t.pricing.enterprise.title 
      : 'Enterprise';
  const enterpriseSubtitle = t.pricing && t.pricing.enterprise && typeof t.pricing.enterprise.subtitle === 'string' 
      ? t.pricing.enterprise.subtitle 
      : 'For large teams';
  const enterprisePrice = t.pricing && t.pricing.enterprise && typeof t.pricing.enterprise.price === 'string' 
      ? t.pricing.enterprise.price 
      : '$29';
  const enterprisePeriod = t.pricing && t.pricing.enterprise && typeof t.pricing.enterprise.period === 'string' 
      ? t.pricing.enterprise.period 
      : '/month';
  const enterpriseFeatures = t.pricing && t.pricing.enterprise && Array.isArray(t.pricing.enterprise.features) 
      ? t.pricing.enterprise.features 
      : ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'Advanced analytics'];
  const enterpriseCta = t.pricing && t.pricing.enterprise && typeof t.pricing.enterprise.cta === 'string' 
      ? t.pricing.enterprise.cta 
      : 'Contact Sales';

  return (
    <div>
      <section id="pricing" className="py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {pricingText}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {pricingTitle}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {pricingDescription}
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 max-w-5xl mx-auto">
            <Card className="bg-background border-2 border-muted">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{freeTitle}</h3>
                  <p className="text-muted-foreground">{freeSubtitle}</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{freePrice}</span>
                  <span className="text-muted-foreground ml-1">{freePeriod}</span>
                </div>
                <ul className="space-y-2">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">
                  {freeCta}
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-primary relative">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full">
                {proPopular}
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{proTitle}</h3>
                  <p className="text-muted-foreground">{proSubtitle}</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{proPrice}</span>
                  <span className="text-muted-foreground ml-1">{proPeriod}</span>
                </div>
                <ul className="space-y-2">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">{proCta}</Button>
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-muted">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{enterpriseTitle}</h3>
                  <p className="text-muted-foreground">{enterpriseSubtitle}</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{enterprisePrice}</span>
                  <span className="text-muted-foreground ml-1">{enterprisePeriod}</span>
                </div>
                <ul className="space-y-2">
                  {enterpriseFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">
                  {enterpriseCta}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}