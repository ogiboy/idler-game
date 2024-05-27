'use client'

import Game from '@/components/Game'

import { Provider } from 'react-redux'
import { store } from './store'
import Loading from '@/components/Loading'
import Saving from '@/components/Saving'

const Home = () => {
  return (
    <Provider store={store}>
      <Game />
      {/* <Loading /> */}
      {/* <Saving /> */}
    </Provider>
  )
}
export default Home
