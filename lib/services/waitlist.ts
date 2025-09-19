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
    // Ensure the data directory exists
    const dataDir = path.dirname(WAITLIST_FILE_PATH)
    await fs.mkdir(dataDir, { recursive: true })

    let existingData: WaitlistEntry[] = []

    // Try to read existing data
    try {
      const fileContent = await fs.readFile(WAITLIST_FILE_PATH, "utf-8")
      existingData = JSON.parse(fileContent)
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      existingData = []
    }

    // Check if email already exists
    const emailExists = existingData.some(
      (existingEntry) => existingEntry.email.toLowerCase() === entry.email.toLowerCase(),
    )

    if (emailExists) {
      throw new Error("Cette adresse e-mail est déjà inscrite")
    }

    // Add new entry
    existingData.push(entry)

    // Write back to file
    await fs.writeFile(WAITLIST_FILE_PATH, JSON.stringify(existingData, null, 2), "utf-8")
  } catch (error) {
    console.error("Erreur lors de la sauvegarde dans la liste d'attente:", error)
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
