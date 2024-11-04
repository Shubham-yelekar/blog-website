import './App.css'
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from "./appwrite/auth"
import {login ,logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])

  return !loading ? (
    <div className='bg-gray-950 min-h-screen content-between text-slate-100'>
      <div className='w-full block'>
        <Header/>
          <main>
            TODO:  <Outlet />
          </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App
