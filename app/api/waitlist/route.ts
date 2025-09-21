import { type NextRequest, NextResponse } from "next/server"
import { saveToWaitlist } from "@/lib/services/waitlist"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Données reçues:", body) // Added debug log for received data

    // Validate required fields
    const { name, businessName, industry, email } = body

    if (!name || !businessName || !industry || !email) {
      console.log("[v0] Validation échouée: champs manquants") // Added validation failure log
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] Validation échouée: email invalide:", email) // Added email validation log
      return NextResponse.json({ error: "Adresse e-mail invalide" }, { status: 400 })
    }

    // Save to waitlist
    const entry = {
      name: name.trim(),
      businessName: businessName.trim(),
      industry,
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    }

    console.log("[v0] Tentative de sauvegarde:", entry) // Added save attempt log
    await saveToWaitlist(entry)
    console.log("[v0] Sauvegarde réussie dans data/waitlist.json") // Added success log

    return NextResponse.json({ message: "Inscription réussie", entry }, { status: 201 })
  } catch (error) {
    console.error("[v0] Erreur lors de l'inscription à la liste d'attente:", error) // Enhanced error log
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
