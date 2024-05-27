import { animated, useTransition } from '@react-spring/web'
import { useSelector } from 'react-redux'

const PoorPlayer = () => {
  const { isPlayerPoor } = useSelector((store) => store.game)

  const transitions = useTransition(isPlayerPoor, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(20px)' },
  })

  return (
    <div>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              className="bg-black/50 text-white w-fit px-5 py-6 rounded-lg fixed right-3 bottom-6"
            >
              Not enough money :(
            </animated.div>
          )
      )}
    </div>
  )
}
export default PoorPlayer
