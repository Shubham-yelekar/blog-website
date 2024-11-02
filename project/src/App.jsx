import './App.css'
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from "./appwrite/auth"
import {login ,logout} from "./store/authSlice"
import { Footer, Header } from './components'

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
    <div className='bg-slate-900 min-h-screen content-between text-slate-100'>
      <Header/>
        <main>
         body {/* <Outlet></Outlet> */}
        </main>
      <Footer/>
    </div>
  ) : null;
}

export default App
