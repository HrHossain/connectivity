
import Avatar from "../../assets/images/avatars/avatar_1.png"
import TimeIcon from "../../assets/icons/time.svg"
import DotsIcon from "../../assets/icons/3dots.svg"
import UserAction from "./UserAction"
import { useState } from "react"
import useAvatar from "../../hooks/useAvatar"

const PostHeader = ({post}) => {
        const [ show, setToggle ] = useState(false)
        const {avatarURL} = useAvatar(post)
       
  return (
    <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={avatarURL} alt="avatar" />
            <div>
              <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
              <div className="flex items-center gap-1.5">
                <img src={TimeIcon} alt="time" />
                <span className="text-sm text-gray-400 lg:text-base">12 min ago</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button onClick={()=>setToggle(prev=>!prev)}>
              <img src={DotsIcon} alt="3dots of Action" />
            </button>
            { show && <UserAction /> }
          </div>  
        </header>
        
  )
}

export default PostHeader