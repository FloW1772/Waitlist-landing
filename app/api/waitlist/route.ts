import { type NextRequest, NextResponse } from "next/server"
import { saveToWaitlist } from "@/lib/services/waitlist"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, businessName, industry, email } = body

    if (!name || !businessName || !industry || !email) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
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

    await saveToWaitlist(entry)

    return NextResponse.json({ message: "Inscription réussie", entry }, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de l'inscription à la liste d'attente:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
