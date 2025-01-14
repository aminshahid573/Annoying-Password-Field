import React from 'react'
import { Progress } from "@/components/ui/progress"

type PasswordStrengthMeterProps = {
  password: string
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const calculateStrength = (pwd: string): number => {
    let strength = 0
    if (pwd.length > 6) strength += 1
    if (pwd.match(/[a-z]+/)) strength += 1
    if (pwd.match(/[A-Z]+/)) strength += 1
    if (pwd.match(/[0-9]+/)) strength += 1
    if (pwd.match(/[$@#&!]+/)) strength += 1
    return (strength / 5) * 100
  }

  const strength = calculateStrength(password)

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Password Strength</div>
      <Progress value={strength} className="w-full" />
    </div>
  )
}

