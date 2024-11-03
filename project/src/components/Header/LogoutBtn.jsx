import React from 'react'
import {useDispatch} from 'react-redux'
import authService from "../../appwrite/config"
import {logout} from "../../store/authSlice"

const LogoutBtn = () => {
  const dispatch =  useDispatch()
  const logoutHandler =()=>{
    authService.logout().then(()=>{
      dispatch(logout())
    })
  }

  return (
    <button className='bg-blue-600 text-white py-2 px-4 rounded-md'>Log out</button>
  )
}

export default LogoutBtn