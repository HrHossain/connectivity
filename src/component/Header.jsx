import HomeIcon from "../assets/icons/home.svg"
import NotificationIcon from "../assets/icons/notification.svg"
import LogoutIcon from "../assets/icons/logout.svg"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/auth/authSlice"
import { UserRoundArrowLeft } from "lucide-react"


const Header = () => {
  const {user} = useSelector(state => state.auth)
  const {profile} = useSelector(state=> state.profile)
  
  const me = profile ?? user
   const dispatch =  useDispatch()
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
    <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
      
    <Link
        to="/"
        className="inline-flex items-center text-2xl font-extrabold tracking-tight text-white transition-colors duration-200 hover:text-lwsGreen focus:outline-none focus:ring-2 focus:ring-lwsGreen focus:ring-offset-2 focus:ring-offset-deepDark"
      >
  <span className="text-blue-800">Con</span>nectivity
</Link>
      

      <div className="flex items-center space-x-4">
        <Link to="/" className="btn-primary">
          <img src={HomeIcon} alt="Home" />
          Home
        </Link>
        <button className="icon-btn">
          <img src={NotificationIcon} alt="Notification" />
        </button>
        <button onClick={()=>dispatch(logout())} className="icon-btn">
          <img src={LogoutIcon} alt="Logout" />
        </button>

        <Link to="me" className="flex-center !ml-8 gap-3">
          <span className="text-lg font-medium lg:text-xl">{me?.firstName}</span>
          {
            me?.avatar ? <img className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${me?.avatar}`} alt="" /> : 
            <UserRoundArrowLeft />
          }
        </Link>
      </div>
      
    </div>
  </nav>
  )
}

export default Header