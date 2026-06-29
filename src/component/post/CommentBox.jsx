

import { useState } from "react"
import useAvatar from "../../hooks/useAvatar"
import CommentHistory from "./CommentHistory"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"
const CommentBox = ({post}) => {
  const {avatarURL} = useAvatar(post)
  const [show,setShow] = useState(false)
  return (
    <>
    <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
              src={avatarURL} alt="user avatar" />

            <div className="flex-1">
              <input type="text"
                className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]" name="post"
                id="post" placeholder="What's on your mind?" />
            </div>
          </div>
           <div className="mt-4">
            <button onClick={()=>setShow(s=>!s)} className="text-gray-300 max-md:text-sm flex gap-2">
              All Comment {show ? <CircleArrowUp /> : <CircleArrowDown /> }
            </button>
          </div>
       {
        show &&  <CommentHistory comments={post?.comments} />
       }

          </>
  )
}

export default CommentBox