import { useState, useEffect } from 'react'
import { animated, useSpring, config } from '@react-spring/web'

const Saving = () => {
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
    <div className="bg-black/50 text-white px-5 py-6 rounded-lg fixed left-3 bottom-6 w-32 ">
      Saving<animated.span style={styles}>{dots}</animated.span>
    </div>
  )
}
export default Saving
