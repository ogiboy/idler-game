import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
  isLoaded: false,
  isSaved: false,
}

export const saveData = createAsyncThunk(
  'game/saveData',
  async (_, { getState }) => {
    const state = getState().game
    const { money, buildings } = state

    console.log('Saving data...', { money, buildings })

    await Promise.all([
      Cookies.set('money', money, { expires: 2, sameSite: 'Strict' }),
      Cookies.set('buildings', JSON.stringify(buildings), {
        expires: 2,
        sameSite: 'Strict',
      }),
    ])
    console.log('Data saved:', { money, buildings })
  }
)

export const loadData = createAsyncThunk(
  'game/loadData',
  async (_, { dispatch }) => {
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
  }
)

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setMoney: (state, { payload }) => {
      console.log('Setting money:', payload)
      state.money = payload
    },

    setBuildings: (state, { payload }) => {
      console.log('Setting buildings:', payload)
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
    setIsSaved: (state, { payload }) => {
      state.isSaved = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        console.log('loading data')
      })
      .addCase(loadData.fulfilled, (state, action) => {
        console.log('data loaded')
        state.isLoaded = true
      })
      .addCase(loadData.rejected, (state, action) => {
        console.error('Error loading data:', action.error.message)
      })
      .addCase(saveData.pending, (state) => {
        console.log('data saving')
      })
      .addCase(saveData.fulfilled, (state, action) => {
        console.log('data saved')
        state.isSaved = true
      })
      .addCase(saveData.rejected, (state, action) => {
        console.error('Error saving data:', action.error.message)
      })
  },
})

export const {
  setMoney,
  setBuildings,
  setIsPlayerPoor,
  incrementMoney,
  resetGame,
  setIsSaved,
} = gameSlice.actions

export default gameSlice.reducer
