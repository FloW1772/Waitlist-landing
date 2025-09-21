"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, User, Building, Briefcase } from "lucide-react"

interface FormData {
  name: string
  businessName: string
  industry: string
  email: string
}

const industries = [
  "Commerce de détail",
  "Restauration",
  "Services professionnels",
  "Santé et bien-être",
  "Technologie",
  "Éducation",
  "Immobilier",
  "Finance",
  "Artisanat",
  "Autre",
]

export function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    businessName: "",
    industry: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({
        title: "Erreur de validation",
        description: "Le nom complet est requis.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.businessName.trim()) {
      toast({
        title: "Erreur de validation",
        description: "Le nom du commerce est requis.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.industry) {
      toast({
        title: "Erreur de validation",
        description: "Le secteur d'activité est requis.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.email.trim()) {
      toast({
        title: "Erreur de validation",
        description: "L'adresse e-mail est requise.",
        variant: "destructive",
      })
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez saisir une adresse e-mail valide.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription")
      }

      toast({
        title: "Inscription réussie !",
        description: "Merci ! Vous êtes sur la liste d'attente.",
      })

      // Reset form
      setFormData({
        name: "",
        businessName: "",
        industry: "",
        email: "",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue, veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Nom complet *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Votre nom complet"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="h-12 text-base border-2 border-border/50 focus:border-primary transition-colors rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="businessName" className="text-base font-medium flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              Nom du commerce *
            </Label>
            <Input
              id="businessName"
              type="text"
              placeholder="Nom de votre entreprise"
              value={formData.businessName}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              required
              className="h-12 text-base border-2 border-border/50 focus:border-primary transition-colors rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="industry" className="text-base font-medium flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Secteur d'activité *
          </Label>
          <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
            <SelectTrigger className="h-12 text-base border-2 border-border/50 focus:border-primary transition-colors rounded-xl">
              <SelectValue placeholder="Sélectionnez votre secteur" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry} className="text-base">
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Adresse e-mail *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className="h-12 text-base border-2 border-border/50 focus:border-primary transition-colors rounded-xl"
          />
        </div>

        <div className="space-y-6 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Inscription en cours...
              </>
            ) : (
              "Rejoindre la liste d'attente"
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">✨ Aucun spam, seulement les informations importantes</p>
            <p className="text-xs text-muted-foreground">
              Vous recevrez un email de confirmation dans les prochaines minutes
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
