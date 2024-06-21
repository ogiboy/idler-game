import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import Cookies from 'js-cookie'

const startingMoney = 50
const startingState = [
  {
    name: 'Çaycı',
    cost: 50,
    number: 0,
    income: 6,
    duration: 1000,
  },
  {
    name: 'Simitçi',
    cost: 150,
    number: 0,
    income: 18,
    duration: 2000,
  },
  {
    name: 'Tostçu',
    cost: 350,
    number: 0,
    income: 42,
    duration: 3000,
  },
  {
    name: 'Midyeci',
    cost: 500,
    number: 0,
    income: 75,
    duration: 3500,
  },
  {
    name: 'Kokoreççi',
    cost: 800,
    number: 0,
    income: 120,
    duration: 5000,
  },
  {
    name: 'Waffle House',
    cost: 1300,
    number: 0,
    income: 195,
    duration: 7000,
  },
  {
    name: 'Cafe',
    cost: 1500,
    number: 0,
    income: 250,
    duration: 10000,
  },
  {
    name: 'Lokanta',
    cost: 5000,
    number: 0,
    income: 750,
    duration: 20000,
  },
  {
    name: 'Börekçi',
    cost: 2000,
    number: 0,
    income: 240,
    duration: 20000,
  },
  {
    name: 'Tatlıcı',
    cost: 3500,
    number: 0,
    income: 420,
    duration: 25000,
  },
  {
    name: 'Meşrubatçı',
    cost: 7500,
    number: 0,
    income: 900,
    duration: 40000,
  },
  {
    name: 'Restoran',
    cost: 12000,
    number: 0,
    income: 1440,
    duration: 50000,
  },
  {
    name: 'Otel',
    cost: 20000,
    number: 0,
    income: 2400,
    duration: 60000,
  },
]

const savedMoney = Cookies.get('money')
const savedBuildings = Cookies.get('buildings')

const initialState = {
  money: savedMoney ? savedMoney : startingMoney,
  buildings: savedBuildings
    ? JSON.parse(savedBuildings).sort((a, b) => a.cost - b.cost)
    : startingState.sort((a, b) => a.cost - b.cost),
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
