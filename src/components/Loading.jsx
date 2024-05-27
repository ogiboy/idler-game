import { animated, useSpring, config } from '@react-spring/web'
import { useState, useEffect } from 'react'

const Loading = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return ''
        } else {
          return prevDots + '.'
        }
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    reverse: dots.length === 3,
    reset: true,
    onRest: () => setDots(''),
    config: config.molasses,
  })

  return (
    <div className="w-screen h-screen flex items-center justify-center text-3xl">
      Loading<animated.span style={styles}>{dots}</animated.span>
    </div>
  )
}
export default Loading
