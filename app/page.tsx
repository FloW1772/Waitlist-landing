import { WaitlistForm } from "@/components/WaitlistForm"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="text-balance">
              Révolutionnez votre <span className="text-secondary">activité commerciale</span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            <span className="text-pretty">
              Découvrez notre solution innovante conçue spécialement pour les professionnels comme vous. Soyez parmi les
              premiers à en bénéficier.
            </span>
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#waitlist"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            >
              Rejoindre la liste d'attente
            </a>
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Inscrivez-vous dès maintenant
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              <span className="text-pretty">
                Complétez le formulaire ci-dessous pour rejoindre notre liste d'attente et être informé en priorité du
                lancement.
              </span>
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">© 2024. Tous droits réservés.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
