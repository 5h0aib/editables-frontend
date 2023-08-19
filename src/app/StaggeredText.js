"use client"
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
  }, [count])

  return (
    <div className='staggered-text'>
      {/* {letters.reduce((mappedArray, letter, index) => {
        if (index < displayText) {
          // Whatever range condition you want
          mappedArray.push(<span key={index}>{letter}</span>)
        }
        return mappedArray
      }, [])} */}
      {weDo ? doText.slice(0, count) : dontText.slice(0, count)}
    </div>
  )
}

export default StaggeredText
