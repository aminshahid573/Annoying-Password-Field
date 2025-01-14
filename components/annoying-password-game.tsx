"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { XCircle } from 'lucide-react'
import { gsap } from 'gsap'
import PasswordStrengthMeter from './password-strength-meter'
import GameTimer from './game-timer'
import Leaderboard from './leaderboard'
import ThreeBackground from './three-background'

type Condition = {
  check: (pwd: string) => boolean;
  description: string;
}

const conditions: Condition[] = [
  { check: (pwd: string) => /[IVXLCDM]/.test(pwd), description: "Must contain at least one Roman numeral (I, V, X, L, C, D, M)" },
  { check: (pwd: string) => pwd.length >= 8, description: "Must be at least 8 characters long" },
  { check: (pwd: string) => /\d/.test(pwd), description: "Must include at least one Arabic numeral (0-9)" },
  { check: (pwd: string) => /[A-Z]/.test(pwd.replace(/[IVXLCDM]/g, '')), description: "Must include a non-Roman numeral uppercase letter" },
  { check: (pwd: string) => /[a-z]/.test(pwd), description: "Must include a lowercase letter" },
  { check: (pwd: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pwd), description: "Must include a special character" },
  { check: (pwd: string) => /(.)\1/.test(pwd), description: "Must have at least one repeated character" },
  { check: (pwd: string) => romanToInt(pwd.match(/[IVXLCDM]+/g)?.join('') || '') > 50, description: "Roman numeral part must represent a number greater than 50" },
  { check: (pwd: string) => pwd.length === romanToInt(pwd.match(/[IVXLCDM]+/g)?.join('') || '').toString().length, description: "Length must equal the number of digits in the Roman numeral's value" },
  { check: (pwd: string) => new Set(pwd.match(/[IVXLCDM]/g) || []).size >= 3, description: "Must use at least 3 different Roman numeral symbols" },
  { check: (pwd: string) => /^[A-Z]/.test(pwd), description: "Must start with an uppercase letter" },
  { check: (pwd: string) => /[aeiou]/i.test(pwd), description: "Must contain at least one vowel" },
  { check: (pwd: string) => pwd.length % 2 === 0, description: "Must have an even number of characters" },
  { check: (pwd: string) => /(\d+)/.test(pwd) && eval(pwd.match(/(\d+)/)[0]) % 3 === 0, description: "Must contain a number divisible by 3" },
  { check: (pwd: string) => new Set(pwd).size >= pwd.length * 0.8, description: "At least 80% of characters must be unique" },
]

function romanToInt(s: string): number {
  const romanValues: { [key: string]: number } = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  }
  let result = 0
  for (let i = 0; i < s.length; i++) {
    const current = romanValues[s[i]] || 0
    const next = romanValues[s[i + 1]] || 0
    if (next > current) {
      result += next - current
      i++
    } else {
      result += current
    }
  }
  return result
}

export default function AnnoyingPasswordGame() {
  const [password, setPassword] = useState("")
  const [activeConditions, setActiveConditions] = useState<Condition[]>([])
  const [message, setMessage] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [finalTime, setFinalTime] = useState(0)
  const messageRef = useRef(null)

  useEffect(() => {
    addNewCondition()
  }, [])

  useEffect(() => {
    if (message) {
      gsap.from(messageRef.current, { 
        y: 20, 
        opacity: 0, 
        duration: 0.5, 
        ease: "power2.out" 
      })
    }
  }, [message])

  const addNewCondition = () => {
    if (activeConditions.length < conditions.length) {
      setActiveConditions([...activeConditions, conditions[activeConditions.length]])
    } else {
      setMessage("Congratulations! You've beaten the game!")
      setGameEnded(true)
    }
  }

  const checkPassword = () => {
    if (!gameStarted) {
      setGameStarted(true)
    }
    const allConditionsMet = activeConditions.every(condition => condition.check(password))
    if (allConditionsMet) {
      setMessage("Good job! But wait, there's more...")
      addNewCondition()
    } else {
      setMessage("Oops! Your password doesn't meet all the conditions. Try again!")
    }
  }

  const unmetConditions = activeConditions.filter(condition => !condition.check(password))

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ThreeBackground />
      <Card className="w-[400px] z-10">
        <CardHeader>
          <CardTitle>Annoying Password Game</CardTitle>
          <CardDescription>Create a password that meets ALL the conditions!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordStrengthMeter password={password} />
            <div className="space-y-2">
              {unmetConditions.map((condition, index) => (
                <Alert key={index} variant="destructive">
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  <AlertDescription>{condition.description}</AlertDescription>
                </Alert>
              ))}
            </div>
            {message && (
              <Alert 
                variant={message.includes("Congratulations") ? "default" : "destructive"}
                ref={messageRef}
              >
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <GameTimer 
              isRunning={gameStarted && !gameEnded} 
              onTimeUpdate={(time) => setFinalTime(time)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={checkPassword} className="w-full">
            Submit Password
          </Button>
        </CardFooter>
      </Card>
      {gameEnded && <Leaderboard score={finalTime} />}
    </div>
  )
}

