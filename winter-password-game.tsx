"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Snowflake, Thermometer, Wind, Umbrella } from 'lucide-react'

const winterConditions = [
  { icon: Snowflake, text: "Must contain a snowflake emoji ❄️" },
  { icon: Thermometer, text: "Must include the word 'cold' or 'freeze'" },
  { icon: Wind, text: "Must have at least 3 consecutive 'o's for the winter wind" },
  { icon: Umbrella, text: "Must end with 'brr' because it's chilly" },
]

export default function WinterPasswordGame() {
  const [password, setPassword] = useState("")
  const [currentCondition, setCurrentCondition] = useState(0)
  const [message, setMessage] = useState("")

  const checkPassword = () => {
    const condition = winterConditions[currentCondition]
    let isValid = false

    switch (currentCondition) {
      case 0:
        isValid = password.includes("❄️")
        break
      case 1:
        isValid = password.toLowerCase().includes("cold") || password.toLowerCase().includes("freeze")
        break
      case 2:
        isValid = /ooo/.test(password)
        break
      case 3:
        isValid = password.endsWith("brr")
        break
    }

    if (isValid) {
      if (currentCondition === winterConditions.length - 1) {
        setMessage("Congratulations! You've created the most annoying winter password ever!")
      } else {
        setCurrentCondition(currentCondition + 1)
        setMessage("Good job! But wait, there's more...")
      }
    } else {
      setMessage("Oops! Try again. Your password doesn't meet the current condition.")
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Winter Password Challenge</CardTitle>
        <CardDescription>Create the most annoying winter password ever!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your winter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Alert>
            <winterConditions[currentCondition].icon className="h-4 w-4" />
            <AlertDescription>{winterConditions[currentCondition].text}</AlertDescription>
          </Alert>
          {message && (
            <Alert variant={message.includes("Congratulations") ? "default" : "destructive"}>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={checkPassword} className="w-full">
          Submit Password
        </Button>
      </CardFooter>
    </Card>
  )
}

