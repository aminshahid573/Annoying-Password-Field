import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type LeaderboardProps = {
  score: number
}

type LeaderboardEntry = {
  name: string
  score: number
}

export default function Leaderboard({ score }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [playerName, setPlayerName] = useState("")

  useEffect(() => {
    // In a real app, you'd fetch this from a database
    const dummyLeaderboard: LeaderboardEntry[] = [
      { name: "Alice", score: 120 },
      { name: "Bob", score: 180 },
      { name: "Charlie", score: 150 },
    ]
    setLeaderboard(dummyLeaderboard)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: LeaderboardEntry = { name: playerName, score }
    const newLeaderboard = [...leaderboard, newEntry].sort((a, b) => a.score - b.score).slice(0, 5)
    setLeaderboard(newLeaderboard)
    // In a real app, you'd send this to a database
  }

  return (
    <Card className="w-[300px] absolute top-4 right-4">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2">
          {leaderboard.map((entry, index) => (
            <li key={index} className="flex justify-between">
              <span>{entry.name}</span>
              <span>{entry.score}s</span>
            </li>
          ))}
        </ol>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full mt-2 p-2 bg-blue-500 text-white rounded">
            Submit Score
          </button>
        </form>
      </CardContent>
    </Card>
  )
}

