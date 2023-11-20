"use client"
import { Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

const StaggeredText = () => {
  const text = "But this is what happens when we don’t"
  const text2 = "And this is what happens when we do   "
  const letters = text.split("")

  const dontText = text.split("")
  const doText = text2.split("")

  const [count, setCount] = useState(0)
  const [weDo, setWeDo] = useState(true)
  const [increment, setIncrement] = useState(1)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => {
        let i = increment
        if (count == dontText.length) {
            i = -1
            setIncrement(i)
            // setWeDo(!weDo)
          }
        if (count == 0) {
          i = 1
          setIncrement(i)
          setWeDo(!weDo)
        }
        return count + i
      })
    }, 50) // Adjust the interval as needed

    return () => clearInterval(interval)
  },  [count, dontText.length, increment, weDo])

  return (
    <Typography variant='h5' gutterBottom className="staggeredText" minHeight="1.5em">
      {weDo ? doText.slice(0, count) : dontText.slice(0, count)}
    </Typography>
  )
}

export default StaggeredText
