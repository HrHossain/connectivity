import { useSelector } from "react-redux"
import Bio from "./Bio"
import ProfilePic from "./ProfilePic"
const ProfileInfo = () => {
  const {profile,loading} = useSelector(state=>state.profile)
  
  return (
    <div className="flex flex-col items-center py-8 text-center">
          
          {
            loading ? "profile is loading": null
          }
           {/* profile avatar */}
           <ProfilePic profile={profile}/>
          
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