import React, { useState, useEffect, useCallback } from 'react'

type GameTimerProps = {
  isRunning: boolean
  onTimeUpdate: (time: number) => void
}

export default function GameTimer({ isRunning, onTimeUpdate }: GameTimerProps) {
  const [time, setTime] = useState(0)

  const updateTime = useCallback(() => {
    setTime((prevTime) => {
      const newTime = prevTime + 1
      onTimeUpdate(newTime)
      return newTime
    })
  }, [onTimeUpdate])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(updateTime, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, updateTime])

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="text-center font-mono text-xl">
      {formatTime(time)}
    </div>
  )
}

