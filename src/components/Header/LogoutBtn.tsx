import Button from "../Button"

import {useDispatch} from 'react-redux'
import authService from "../../backend/Auth"
import { logout } from "../../state/authSlice"

const LogoutBtn = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(()=>{
      dispatch(logout())
    })
  }
  return (
    <Button className="secondary-btn" onClick={logoutHandler}>
      Log out
    </Button>
  )
}

export default LogoutBtn