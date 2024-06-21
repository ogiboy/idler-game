import { animated, useSpring } from '@react-spring/web'

import { useEffect } from 'react'

const Vendor = ({ building, handlePurchase }) => {
  const [spring, api] = useSpring(() => ({
    width: '0%',
    height: '25px',
  }))

  useEffect(() => {
    api.start({
      width: `${building.number}%`,
    })

    return () => api.stop()
  }, [building.number, api])

  const formattedMoney = new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
  }).format(building.cost)

  return (
    <div className="border-2 rounded-md rounded-tl-3xl rounded-br-3xl flex flex-col items-center justify-evenly min-h-32 mx-2 my-5 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-5/6 border-2 rounded-md my-2">
        <animated.div
          className="text-slate-200 bg-gradient-to-r from-blue-500 to-blue-300"
          style={{ ...spring, maxWidth: '100%' }}
        >
          {building.number}
        </animated.div>
      </div>
      <button
        onClick={() => handlePurchase(building.id)}
        className="bg-gradient-to-l hover:bg-gradient-to-r from-cyan-500 to-blue-500 border rounded-md text-slate-200 py-1 px-2 animate-pulse hover:animate-none w-4/6 flex justify-evenly items-center"
      >
        <span>Buy {building.name}</span>
        <span>-</span>
        <span>{formattedMoney}</span>
      </button>
      <p className="text-slate-200">
        Earn {building.income} dollars every {building.duration / 1000} second
        {building.duration > 1000 ? 's' : ''} for each {building.name} you own
      </p>
    </div>
  )
}
export default Vendor
