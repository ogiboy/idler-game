'use client'

import { useState, useEffect } from 'react'

const Home = () => {
  const [money, setMoney] = useState(50)

  const [simitci, setSimitci] = useState({
    cost: 50,
    number: 0,
    income: 10,
  })
  const [tostcu, setTostcu] = useState({
    cost: 150,
    number: 0,
    income: 30,
  })
  const [cafe, setCafe] = useState({
    cost: 300,
    number: 0,
    income: 100,
  })

  function checkMoney(cost) {
    if (money >= cost) return true
    else return false
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMoney((prevMoney) => prevMoney + simitci.number * simitci.income)
    }, 1000)

    return () => clearInterval(interval)
  }, [simitci.number])

  useEffect(() => {
    const interval = setInterval(() => {
      setMoney((prevMoney) => prevMoney + tostcu.number * tostcu.income)
    }, 2000)

    return () => clearInterval(interval)
  }, [tostcu.number])

  useEffect(() => {
    const interval = setInterval(() => {
      setMoney((prevMoney) => prevMoney + cafe.number * cafe.income)
    }, 3000)

    return () => clearInterval(interval)
  }, [cafe.number])

  const buttonClasses =
    'border rounded-md bg-slate-300 text-slate-700 py-1 px-2'

  return (
    <div className="text-center">
      <h1>Your money: {money}$</h1>
      <h2>Your buildings</h2>
      <hr />
      <div>
        <button
          onClick={() => {
            const isMoneyEnough = checkMoney(simitci.cost)
            if (isMoneyEnough) {
              setMoney((prevMoney) => prevMoney - simitci.cost)
              setSimitci((p) => ({ ...p, number: p.number + 1 }))
            } else {
              console.log('Not enough money :(')
            }
          }}
          className={buttonClasses}
        >
          Buy Simitçi - Cost 50$
        </button>
        <p>Simitci: {simitci.number}</p>
        <p>Earn 10 dollars per second for each Simitci you own</p>
      </div>
      <hr />
      <div>
        <button
          onClick={() => {
            const isMoneyEnough = checkMoney(tostcu.cost)
            if (isMoneyEnough) {
              setMoney((prevMoney) => prevMoney - tostcu.cost)
              setTostcu((p) => ({ ...p, number: p.number + 1 }))
            } else {
              console.log('Not enough money :(')
            }
          }}
          className={buttonClasses}
        >
          Buy Tostçu - Cost 150$
        </button>
        <p>Tostçu: {tostcu.number}</p>
        <p>Earn 30 dollars every 2 second for each Tostçu you own</p>
      </div>
      <hr />
      <div>
        <button
          onClick={() => {
            const isMoneyEnough = checkMoney(tostcu.cost)
            if (isMoneyEnough) {
              setMoney((prevMoney) => prevMoney - 300)
              setCafe((p) => p + 1)
            } else {
              console.log('Not enough money :(')
            }
          }}
          className={buttonClasses}
        >
          Buy Cafe - Cost 300$
        </button>
        <p>Cafe: {cafe.number}</p>
        <p>Earn 100 dollars every 3 second for each Cafe you own</p>
      </div>
    </div>
  )
}
export default Home
