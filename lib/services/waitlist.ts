import { promises as fs } from "fs"
import path from "path"

export interface WaitlistEntry {
  name: string
  businessName: string
  industry: string
  email: string
  createdAt: string
}

const WAITLIST_FILE_PATH = path.join(process.cwd(), "data", "waitlist.json")

export async function saveToWaitlist(entry: WaitlistEntry): Promise<void> {
  try {
    console.log("[v0] Début de la sauvegarde, chemin du fichier:", WAITLIST_FILE_PATH) // Added file path log

    // Ensure the data directory exists
    const dataDir = path.dirname(WAITLIST_FILE_PATH)
    await fs.mkdir(dataDir, { recursive: true })
    console.log("[v0] Répertoire data créé/vérifié:", dataDir) // Added directory creation log

    let existingData: WaitlistEntry[] = []

    // Try to read existing data
    try {
      const fileContent = await fs.readFile(WAITLIST_FILE_PATH, "utf-8")
      existingData = JSON.parse(fileContent)
      console.log("[v0] Données existantes lues:", existingData.length, "entrées") // Added existing data log
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      existingData = []
      console.log("[v0] Aucune donnée existante, création d'un nouveau fichier") // Added new file log
    }

    // Check if email already exists
    const emailExists = existingData.some(
      (existingEntry) => existingEntry.email.toLowerCase() === entry.email.toLowerCase(),
    )

    if (emailExists) {
      console.log("[v0] Email déjà existant:", entry.email) // Added duplicate email log
      throw new Error("Cette adresse e-mail est déjà inscrite")
    }

    // Add new entry
    existingData.push(entry)
    console.log("[v0] Nouvelle entrée ajoutée, total:", existingData.length, "entrées") // Added new entry log

    // Write back to file
    await fs.writeFile(WAITLIST_FILE_PATH, JSON.stringify(existingData, null, 2), "utf-8")
    console.log("[v0] Fichier sauvegardé avec succès") // Added successful save log
  } catch (error) {
    console.error("[v0] Erreur lors de la sauvegarde dans la liste d'attente:", error) // Enhanced error log
    throw error
  }
}

export async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  try {
    const fileContent = await fs.readFile(WAITLIST_FILE_PATH, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    // File doesn't exist or is empty
    return []
  }
}

export async function getWaitlistCount(): Promise<number> {
  try {
    const entries = await getWaitlistEntries()
    return entries.length
  } catch (error) {
    return 0
  }
}
