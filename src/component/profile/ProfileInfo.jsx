import { useSelector } from "react-redux"
import EditIcon from "../../assets/icons/edit.svg"
import { UserRoundArrowLeft } from "lucide-react"
import Bio from "./Bio"
const ProfileInfo = () => {
  const {profile,loading} = useSelector(state=>state.profile)
  
  return (
    <div className="flex flex-col items-center py-8 text-center">
          
          {
            loading ? "profile is loading": null
          }
            <div
            className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
          >
           

            {
            profile?.avatar ? <img className="max-w-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${profile?.avatar}`} alt="" /> : 
            <UserRoundArrowLeft />
          }

            <button
              className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            >
            <img src={EditIcon} alt="Edit" />
            </button>
          </div>
          
          <div>
            <h3 className="mt-12 text-2xl font-semibold text-white lg:text-[28px]">
              {profile?.firstName}{' '}{profile?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{profile?.email}</p>
          </div>

          
          {/* bio component */}
            <Bio/>
           
          

          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        
  )
}

export default ProfileInfo