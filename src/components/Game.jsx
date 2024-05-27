'use client'

import Vendor from '@/components/Vendor'
import Header from './Header'

import Cookies from 'js-cookie'

import { animated, useTransition } from '@react-spring/web'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMoney,
  setBuildings,
  setIsPlayerPoor,
  incrementMoney,
  resetGame,
} from '@/features/game/gameSlice'

const Game = () => {
  const [isClient, setIsClient] = useState(false)

  const { money, buildings, isPlayerPoor } = useSelector((store) => store.game)

  const dispatch = useDispatch()

  useEffect(() => {
    const intervals = buildings.map((building) => {
      return setInterval(() => {
        dispatch(incrementMoney(building.number * building.income))
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
          dispatch(setMoney(Number(savedMoney)))
        } else {
          throw new Error('Error fetching money')
        }

        if (savedBuildings) {
          dispatch(setBuildings(JSON.parse(savedBuildings)))
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
        dispatch(setIsPlayerPoor(false))
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isPlayerPoor])

  function handlePurchase(buildingId) {
    const updatedBuildings = buildings.map((building) => {
      if (building.id === buildingId) {
        if (money >= building.cost) {
          dispatch(setMoney(money - building.cost))
          return { ...building, number: building.number + 1 }
        } else {
          console.log('Not enough money :(')
          dispatch(setIsPlayerPoor(true))
        }
      }
      return building
    })
    dispatch(setBuildings(updatedBuildings))
  }

  function handleReset() {
    const confirm = window.confirm('Are you sure?')

    if (confirm) {
      dispatch(resetGame())
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
    <div className="cursor-default bg-blue-300/50 h-screen w-screen select-none">
      {isClient ? (
        <div className="text-center w-full">
          <Header formattedMoney={formattedMoney} handleReset={handleReset} />
          <hr />
          <h2 className="underline tracking-wider text-lg text-blue-900">
            Your buildings
          </h2>
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
                  className="bg-black/50 text-white w-fit px-5 py-6 rounded-lg fixed right-3 bottom-6"
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
export default Game
