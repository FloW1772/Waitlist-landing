import { WaitlistForm } from "@/components/WaitlistForm"
import { ArrowRight, CheckCircle, Users, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <section className="relative px-6 py-24 sm:px-8 lg:px-12 min-h-screen flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-purple opacity-10"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl floating-animation"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-accent/30 rounded-full blur-lg floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-secondary/25 rounded-full blur-lg floating-animation"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl mb-8">
              <span className="text-balance gradient-text">Révolutionnez votre</span>
              <br />
              <span className="text-foreground">activité commerciale</span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              <span className="text-pretty">
                Découvrez notre solution innovante conçue spécialement pour les professionnels comme vous. Soyez parmi
                les premiers à transformer votre façon de travailler.
              </span>
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Rejoindre la liste d'attente
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span className="text-sm">Déjà 2,847 professionnels inscrits</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation rapide</h3>
              <p className="text-muted-foreground">Accélérez vos processus avec nos outils de pointe</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sécurité garantie</h3>
              <p className="text-muted-foreground">Vos données protégées par les plus hauts standards</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Résultats prouvés</h3>
              <p className="text-muted-foreground">+150% d'efficacité en moyenne pour nos clients</p>
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="relative px-6 py-24 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30"></div>

        <div className="relative mx-auto max-w-3xl">
          <div className="glass-effect rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                <span className="gradient-text">Inscrivez-vous</span> dès maintenant
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                <span className="text-pretty">
                  Complétez le formulaire ci-dessous pour rejoindre notre liste d'attente exclusive et être informé en
                  priorité du lancement.
                </span>
              </p>
            </div>

            <WaitlistForm />

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                En vous inscrivant, vous acceptez de recevoir nos communications. Vous pourrez vous désabonner à tout
                moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-border/50 bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold gradient-text mb-4">Votre Solution Business</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Transformez votre activité avec nos outils innovants conçus pour les professionnels exigeants.
              </p>
            </div>

            <div className="border-t border-border/50 pt-8">
              <p className="text-sm text-muted-foreground mb-4">© 2024. Tous droits réservés.</p>
              <div className="flex justify-center space-x-8">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Conditions d'utilisation
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
