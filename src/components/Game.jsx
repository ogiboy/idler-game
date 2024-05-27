'use client'

import Vendor from '@/components/Vendor'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import PoorPlayer from './PoorPlayer'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMoney,
  setBuildings,
  setIsPlayerPoor,
  incrementMoney,
  resetGame,
  loadData,
  saveData,
  setIsSaved,
} from '@/features/game/gameSlice'
import Saving from './Saving'

const Game = () => {
  const [isClient, setIsClient] = useState(false)

  const { money, buildings, isPlayerPoor, isSaved } = useSelector(
    (store) => store.game
  )

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
    const saveInterval = setInterval(() => {
      dispatch(saveData())
    }, 15000)

    return () => {
      clearInterval(saveInterval)
      console.log('save interval cleared')
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(loadData())
  }, [dispatch])

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
  }, [isPlayerPoor, dispatch])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isSaved) {
        dispatch(setIsSaved(false))
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isSaved, dispatch])

  function handlePurchase(buildingId) {
    const updatedBuildings = buildings.map((building) => {
      if (building.id === buildingId) {
        if (money >= building.cost) {
          const updatedBuilding = { ...building, number: building.number + 1 }
          dispatch(setMoney(money - building.cost))
          return updatedBuilding
        } else {
          console.log('Not enough money :(')
          dispatch(setIsPlayerPoor(true))
        }
      }
      return building
    })
    dispatch(setBuildings(updatedBuildings))
    // dispatch(saveData())
    console.log('Buildings updated:', updatedBuildings)
    console.log('Money after purchase:', money)
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
          {isSaved && <Saving />}
          <PoorPlayer />
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}
export default Game
