import { useSelector } from "react-redux"
import EditIcon from "../../assets/icons/edit.svg"
import Avatar from "../../assets/images/avatars/avatar_1.png"
const ProfileInfo = () => {
  const {profile,loading} = useSelector(state=>state.profile)
  
  return (
    <div className="flex flex-col items-center py-8 text-center">
          
          {
            loading ? "profile is loading":<>
            <div
            className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
          >
            <img
              className="max-w-full"
              src={Avatar}
              alt="sumit saha"
            />

            <button
              className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            >
            <img src={EditIcon} alt="Edit" />
            </button>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {profile?.firstName}{' '}{profile?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{profile?.email}</p>
          </div>

          
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {
                  profile?.bio ? profile?.bio : "Add Bio"
                }
              </p>
            </div>
            
            <button className="flex-center h-7 w-7 rounded-full">
              <img src={EditIcon} alt="Edit" />
            </button>
          </div>
            
            </>
          }

          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        
  )
}

export default ProfileInfo