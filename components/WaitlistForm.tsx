"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Rejoignez notre liste d'attente</CardTitle>
        <CardDescription className="text-center">
          Remplissez ce formulaire pour être parmi les premiers informés
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Nom du commerce *</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Nom de votre entreprise"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Secteur d'activité *</Label>
            <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez votre secteur" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Adresse e-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <Button type="submit" disabled={isSubmitting} className="w-full bg-secondary hover:bg-secondary/90">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                "Rejoindre la liste d'attente"
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">Aucun spam, seulement les infos utiles.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
