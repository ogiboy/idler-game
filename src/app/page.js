'use client'

import Vendor from '@/components/Vendor'
import Cookies from 'js-cookie'

import { animated, useTransition } from '@react-spring/web'
import { useState, useEffect } from 'react'

const Home = () => {
  const savedMoney = Cookies.get('money')
  const savedBuildings = Cookies.get('buildings')

  const startingMoney = 50
  const startingState = [
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
      name: 'Midyeci',
      cost: 300,
      number: 0,
      income: 100,
      duration: 3000,
    },
    {
      id: 3,
      name: 'Kokoreççi',
      cost: 500,
      number: 0,
      income: 200,
      duration: 5000,
    },
    {
      id: 4,
      name: 'Cafe',
      cost: 1500,
      number: 0,
      income: 500,
      duration: 15000,
    },
  ]

  const [money, setMoney] = useState(savedMoney || startingMoney)
  const [isClient, setIsClient] = useState(false)
  const [isPlayerPoor, setIsPlayerPoor] = useState(false)

  const [buildings, setBuildings] = useState(
    savedBuildings ? JSON.parse(savedBuildings) : startingState
  )

  useEffect(() => {
    const intervals = buildings.map((building) => {
      return setInterval(() => {
        setMoney((prevMoney) => prevMoney + building.number * building.income)
      }, building.duration)
    })

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [buildings])

  useEffect(() => {
    const saveData = async () => {
      try {
        await Promise.all([
          Cookies.set('money', money, { expires: 2, sameSite: 'Strict' }),
          Cookies.set('buildings', JSON.stringify(buildings), {
            expires: 2,
            sameSite: 'Strict',
          }),
        ])

        // console.log('saved data: ' + money + buildings)
      } catch (error) {
        console.error('Error saving data to cookies:', error)
      }
    }

    saveData()

    const saveInterval = setInterval(saveData, 10000)

    return () => clearInterval(saveInterval)
  }, [money, buildings])

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedMoney = Cookies.get('money')
        const savedBuildings = Cookies.get('buildings')

        if (savedMoney) {
          setMoney(Number(savedMoney))
        } else {
          throw new Error('Error fetching money')
        }

        if (savedBuildings) {
          setBuildings(JSON.parse(savedBuildings))
        } else {
          throw new Error('Error fetching buildings')
        }
      } catch (error) {
        console.log('Error loading save: ', error)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPlayerPoor) {
        setIsPlayerPoor(false)
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isPlayerPoor])

  function handlePurchase(buildingId) {
    const updatedBuildings = buildings.map((building) => {
      if (building.id === buildingId) {
        if (money >= building.cost) {
          setMoney(money - building.cost)
          return { ...building, number: building.number + 1 }
        } else {
          console.log('Not enough money :(')
          setIsPlayerPoor(true)
        }
      }
      return building
    })
    setBuildings(updatedBuildings)
  }

  function handleReset() {
    const confirm = window.confirm('Are you sure?')

    if (confirm) {
      setBuildings(startingState)
      setMoney(startingMoney)

      Cookies.remove('money')
      Cookies.remove('buildings')
      // console.log('Cookies removed')
    }
  }

  const formattedMoney = new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
  }).format(money)

  const transitions = useTransition(isPlayerPoor, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(20px)' },
  })

  return (
    <div className="cursor-default bg-blue-300/50">
      {isClient ? (
        <div className="text-center">
          <div className="relative p-5">
            <h1 className="text-5xl">{formattedMoney}</h1>
            <button
              onClick={() => handleReset()}
              className="absolute top-8 left-3 bg-gradient-to-tr hover:bg-gradient-to-bl from-red-500 to-yellow-500 rounded-sm px-2 hover:ring-1"
            >
              Reset Progress
            </button>
          </div>
          <hr />
          <h2 className="underline tracking-wider text-lg">Your buildings</h2>
          {buildings &&
            buildings.map((building) => {
              return (
                <Vendor
                  key={building.id}
                  building={building}
                  handlePurchase={handlePurchase}
                />
              )
            })}
          {transitions(
            (styles, item) =>
              item && (
                <animated.div
                  style={styles}
                  className="bg-black/50 text-white w-fit px-5 py-6 rounded-lg absolute right-3 bottom-3"
                >
                  Not enough money :(
                </animated.div>
              )
          )}
          <p className="fixed bottom-0 w-screen text-center bg-blue-300/50">
            This game uses an autosave feature 💾
          </p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}
export default Home
