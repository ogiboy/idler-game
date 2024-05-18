'use client'

import Vendor from '@/components/Vendor'

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
      if (building.id === buildingId) {
        if (money >= building.cost) {
          setMoney(money - building.cost)
          return { ...building, number: building.number + 1 }
        } else {
          console.log('Not enough money :(')
        }
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

  // useEffect(() => {
  //   console.log(money)
  // }, [money])

  return (
    <div className="text-center">
      <h1>Your money: {money}$</h1>
      <h2>Your buildings</h2>
      <hr />
      {buildings.map((building) => {
        return (
          <Vendor
            key={building.id}
            building={building}
            handlePurchase={handlePurchase}
          />
        )
      })}
    </div>
  )
}
export default Home
