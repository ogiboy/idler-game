import { createSlice } from '@reduxjs/toolkit'

import Cookies from 'js-cookie'

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

const savedMoney = Cookies.get('money')
const savedBuildings = Cookies.get('buildings')

const initialState = {
  money: savedMoney ? savedMoney : startingMoney,
  buildings: savedBuildings ? JSON.parse(savedBuildings) : startingState,
  isPlayerPoor: false,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setMoney: (state, { payload }) => {
      state.money = payload
    },

    setBuildings: (state, { payload }) => {
      state.buildings = payload
    },

    setIsPlayerPoor: (state, { payload }) => {
      state.isPlayerPoor = payload
    },

    incrementMoney: (state, action) => {
      state.money += action.payload
    },

    resetGame: (state) => {
      state.money = startingMoney
      state.buildings = startingState

      Cookies.remove('money')
      Cookies.remove('buildings')
    },
  },
})

export const {
  setMoney,
  setBuildings,
  setIsPlayerPoor,
  incrementMoney,
  resetGame,
} = gameSlice.actions

export default gameSlice.reducer
