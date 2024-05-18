'use client'

import { useState, useEffect } from 'react'

const Home = () => {
  const [money, setMoney] = useState(50)

  const [buildings, setBuildings] = useState([
    {
      id: 0,
      name: 'Simitçi',
      cost: 50,
      number: 0,
      income: 10,
      duration: 1000,
    },
    {
      id: 1,
      name: 'Tostçu',
      cost: 150,
      number: 0,
      income: 30,
      duration: 2000,
    },
    {
      id: 2,
      name: 'Cafe',
      cost: 300,
      number: 0,
      income: 100,
      duration: 3000,
    },
  ])

  function handlePurchase(buildingId) {
    const updatedBuildings = buildings.map((building) => {
      if (building.id === buildingId && money >= building.cost) {
        setMoney(money - building.cost)
        return { ...building, number: building.number + 1 }
      }
      return building
    })
    setBuildings(updatedBuildings)
  }

  useEffect(() => {
    const intervals = buildings.map((building) => {
      return setInterval(() => {
        setMoney((prevMoney) => prevMoney + building.number * building.income)
      }, building.duration)
    })

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [buildings])

  useEffect(() => {
    console.log(money)
  }, [money])

  const buttonClasses =
    'border rounded-md bg-slate-300 text-slate-700 py-1 px-2'

  return (
    <div className="text-center">
      <h1>Your money: {money}$</h1>
      <h2>Your buildings</h2>
      <hr />
      {buildings.map((building) => {
        return (
          <div key={building.id}>
            <button
              onClick={() => handlePurchase(building.id)}
              className={buttonClasses}
            >
              Buy {building.name} - Cost {building.cost}
            </button>
            <p>
              {building.name}: {building.number}
            </p>
            <p>
              Earn {building.income} dollars every {building.duration / 1000}{' '}
              second{building.duration > 1000 ? 's' : ''} for each{' '}
              {building.name} you own
            </p>
          </div>
        )
      })}
    </div>
  )
}
export default Home
