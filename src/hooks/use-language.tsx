"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const translations = {
  fr: {
    features: "Fonctionnalités",
    pricing: "Tarifs",
    testimonials: "Témoignages",
    contact: "Contactez nous",
    blog: "Blog",
    login: "Connexion",
    signup: "S'inscrire",
    switchToSignup: "Pas de compte ? S'inscrire",
    switchToLogin: "Déjà un compte ? Se connecter",
    hero: {
      tagline: "✨ Simplifiez votre quotidien",
      title: "Gérez vos tâches comme jamais auparavant",
      description: "Tasky vous aide à organiser votre travail, augmenter votre productivité et ne plus jamais manquer une échéance.",
      startNow: "Commencer maintenant",
      goToDashboard: "Aller sur le dashboard"
    },
    features: {
      title: "Tout ce dont vous avez besoin",
      description: "Tasky combine les meilleurs outils pour vous aider à rester organisé et productif.",
      taskManagement: {
        title: "Gestion des tâches",
        description: "Créez, organisez et suivez vos tâches avec une interface intuitive."
      },
      calendar: {
        title: "Vue calendrier",
        description: "Visualisez vos tâches dans un calendrier pour mieux planifier votre temps."
      },
      priorities: {
        title: "Tâches prioritaires",
        description: "Marquez les tâches importantes pour ne jamais manquer ce qui compte vraiment."
      },
      stats: {
        title: "Statistiques détaillées",
        description: "Suivez votre productivité avec des graphiques et des statistiques claires."
      },
      collaboration: {
        title: "Collaboration",
        description: "Partagez des tâches et collaborez avec votre équipe en temps réel."
      },
      reminders: {
        title: "Rappels intelligents",
        description: "Recevez des notifications pour ne jamais manquer une échéance importante."
      }
    },
    pricing: {
      title: "Des forfaits adaptés à vos besoins",
      description: "Choisissez le plan qui vous convient, sans engagement.",
      free: {
        title: "Gratuit",
        subtitle: "Pour les utilisateurs individuels",
        price: "0€",
        period: "/mois",
        features: [
          "Jusqu'à 20 tâches",
          "Vue calendrier basique",
          "Rappels par email"
        ],
        cta: "Commencer gratuitement"
      },
      pro: {
        title: "Pro",
        subtitle: "Pour les professionnels",
        price: "9,99€",
        period: "/mois",
        popular: "Populaire",
        features: [
          "Tâches illimitées",
          "Vue calendrier avancée",
          "Statistiques détaillées",
          "Rappels par SMS et email"
        ],
        cta: "Essai gratuit de 14 jours"
      },
      enterprise: {
        title: "Entreprise",
        subtitle: "Pour les équipes",
        price: "24,99€",
        period: "/mois",
        features: [
          "Tout ce qui est inclus dans Pro",
          "Gestion d'équipe avancée",
          "API personnalisée",
          "Support prioritaire"
        ],
        cta: "Contacter les ventes"
      }
    },
    cta: {
      title: "Prêt à booster votre productivité ?",
      description: "Rejoignez des milliers d'utilisateurs satisfaits et commencez à mieux gérer votre temps dès aujourd'hui.",
      button: "Commencer gratuitement"
    },
    footer: {
      description: "Simplifiez votre quotidien avec Tasky, l'application de gestion de tâches la plus intuitive.",
      product: "Produit",
      company: "Entreprise",
      legal: "Légal",
      copyright: "Tous droits réservés."
    }
  },
  en: {
    features: "Features",
    pricing: "Pricing",
    testimonials: "Testimonials",
    contact: "Contact us",
    blog: "Blog",
    login: "Login",
    signup: "Sign Up",
    switchToSignup: "No account? Sign up",
    switchToLogin: "Already have an account? Log in",
    hero: {
      tagline: "✨ Simplify your daily life",
      title: "Manage your tasks like never before",
      description: "Tasky helps you organize your work, increase your productivity, and never miss a deadline again.",
      startNow: "Get Started",
      goToDashboard: "Go to Dashboard"
    },
    features: {
      title: "Everything you need",
      description: "Tasky combines the best tools to help you stay organized and productive.",
      taskManagement: {
        title: "Task Management",
        description: "Create, organize, and track your tasks with an intuitive interface."
      },
      calendar: {
        title: "Calendar View",
        description: "Visualize your tasks in a calendar to better plan your time."
      },
      priorities: {
        title: "Priority Tasks",
        description: "Mark important tasks to never miss what really matters."
      },
      stats: {
        title: "Detailed Statistics",
        description: "Track your productivity with clear graphs and statistics."
      },
      collaboration: {
        title: "Collaboration",
        description: "Share tasks and collaborate with your team in real-time."
      },
      reminders: {
        title: "Smart Reminders",
        description: "Receive notifications to never miss an important deadline."
      }
    },
    pricing: {
      title: "Plans that fit your needs",
      description: "Choose the plan that suits you, no commitment required.",
      free: {
        title: "Free",
        subtitle: "For individual users",
        price: "$0",
        period: "/month",
        features: [
          "Up to 20 tasks",
          "Basic calendar view",
          "Email reminders"
        ],
        cta: "Start for free"
      },
      pro: {
        title: "Pro",
        subtitle: "For professionals",
        price: "$9.99",
        period: "/month",
        popular: "Popular",
        features: [
          "Unlimited tasks",
          "Advanced calendar view",
          "Detailed statistics",
          "SMS and email reminders"
        ],
        cta: "14-day free trial"
      },
      enterprise: {
        title: "Enterprise",
        subtitle: "For teams",
        price: "$24.99",
        period: "/month",
        features: [
          "Everything in Pro",
          "Advanced team management",
          "Custom API",
          "Priority support"
        ],
        cta: "Contact sales"
      }
    },
    cta: {
      title: "Ready to boost your productivity?",
      description: "Join thousands of satisfied users and start managing your time better today.",
      button: "Start for free"
    },
    footer: {
      description: "Simplify your daily life with Tasky, the most intuitive task management application.",
      product: "Product",
      company: "Company",
      legal: "Legal",
      copyright: "All rights reserved."
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
} 