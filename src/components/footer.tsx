"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";

export default function Footer() {
    const { t } = useLanguage();

    // Vérifier si les traductions sont des chaînes de caractères ou des objets
    const footerDescription = t.footer && typeof t.footer.description === 'string' 
        ? t.footer.description 
        : 'Tasky is a simple and efficient task management application.';
    
    const footerProduct = t.footer && typeof t.footer.product === 'string' 
        ? t.footer.product 
        : 'Product';
    
    const footerCompany = t.footer && typeof t.footer.company === 'string' 
        ? t.footer.company 
        : 'Company';
    
    const footerLegal = t.footer && typeof t.footer.legal === 'string' 
        ? t.footer.legal 
        : 'Legal';
    
    const featuresText = typeof t.features === 'string' 
        ? t.features 
        : 'Features';
    
    const pricingText = typeof t.pricing === 'string' 
        ? t.pricing 
        : 'Pricing';
    
    const contactText = typeof t.contact === 'string' 
        ? t.contact 
        : 'Contact';

    return (
        <div>
            <footer className="border-t py-12">
                <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Link href="/">
                                <Image 
                                className="dark:hidden" 
                                src="/logo-light.png" 
                                alt="logo" 
                                width={150} 
                                height={150} 
                                priority 
                                />

                                {/* Logo sombre (visible en mode dark) */}
                                <Image 
                                className="hidden dark:block" 
                                src="/logo-dark.png" 
                                alt="logo" 
                                width={150} 
                                height={150} 
                                priority 
                                />          
                            </Link>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {footerDescription}
                    </p>
                    </div>
                    <div className="space-y-4">
                    <h4 className="font-medium">{footerProduct}</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                        <a href="#features" className="text-muted-foreground hover:text-foreground">
                            {featuresText}
                        </a>
                        </li>
                        <li>
                        <a href="#pricing" className="text-muted-foreground hover:text-foreground">
                            {pricingText}
                        </a>
                        </li>
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            {contactText}
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div className="space-y-4">
                    <h4 className="font-medium">{footerCompany}</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            À propos
                        </a>
                        </li>
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            Blog
                        </a>
                        </li>
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            {contactText}
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div className="space-y-4">
                    <h4 className="font-medium">{footerLegal}</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            Conditions d'utilisation
                        </a>
                        </li>
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            Politique de confidentialité
                        </a>
                        </li>
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            Cookies
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Tasky. {t.footer.copyright}
                </div>
                </div>
            </footer>
        </div>
    )
}