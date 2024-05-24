import { animated, useSpring } from '@react-spring/web'

import { useEffect } from 'react'

const Vendor = ({ building, handlePurchase }) => {
  const [spring, api] = useSpring(() => ({
    width: '10px',
    height: '25px',
  }))

  useEffect(() => {
    api.start({
      width: `${building.number * 10}px`,
    })

    return () => api.stop()
  }, [building.number, api])

  return (
    <div className="border-2 flex flex-col items-center justify-between min-h-24">
      <button
        onClick={() => handlePurchase(building.id)}
        className="border rounded-md bg-slate-300 hover:text-slate-100 hover:bg-slate-400 text-slate-700 py-1 px-2 disabled:bg-slate-200 disabled:text-slate-700"
      >
        Buy {building.name} - Cost {building.cost}
      </button>

      <div className="w-5/6 border-2 rounded-md my-2">
        <animated.div
          className="border-2 border-blue-500 bg-blue-600 text-slate-200"
          style={{ ...spring, maxWidth: '100%' }}
        >
          {building.number}
        </animated.div>
      </div>

      <p>
        Earn {building.income} dollars every {building.duration / 1000} second
        {building.duration > 1000 ? 's' : ''} for each {building.name} you own
      </p>
    </div>
  )
}
export default Vendor
