'use client'

import Game from '@/components/Game'

import { Provider } from 'react-redux'
import { store } from './store'

const Home = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}
export default Home
