import React from  'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Header'
import AuthBox from './AuthBox'
import { useGlobalContext } from '../context/GolobalContext'

const Layout = () => {
  const { fetchingUser } = useGlobalContext()
  return fetchingUser ? (
    <div className='loading'>
      <h1>loading...</h1>
    </div>
  ) : (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<AuthBox />} />
        <Route path='/register' element={<AuthBox register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Layout;