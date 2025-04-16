import Image from "next/image";
import Link from "next/link";

export default function Footer() {


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
                        Tasky est un outil de gestion de tâches conçu pour simplifier votre quotidien.
                    </p>
                    </div>
                    <div className="space-y-4">
                    <h4 className="font-medium">Produits</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                        <a href="#features" className="text-muted-foreground hover:text-foreground">
                            Tableau de bord
                        </a>
                        </li>
                        <li>
                        <a href="#pricing" className="text-muted-foreground hover:text-foreground">
                            Liste des tâches
                        </a>
                        </li>
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            Ajouter une tâche
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div className="space-y-4">
                    <h4 className="font-medium">À propos</h4>
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
                            Contact
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div className="space-y-4">
                    <h4 className="font-medium">Mentions légales</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            Conditions d&apos;utilisation
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
                    © {new Date().getFullYear()} Tasky. Tous droits réservés.
                </div>
                </div>
            </footer>
        </div>
    )
}