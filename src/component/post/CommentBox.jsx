

import { useState } from "react"
import useAvatar from "../../hooks/useAvatar"
import CommentHistory from "./CommentHistory"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"
import secureApi from "../../api/axiosSecure"
import { useSelector } from "react-redux"
const CommentBox = ({post,onCommentCount}) => {
  const {user} = useSelector(s=>s.auth)
  const [comments,setComments] = useState(post?.comments)
  const [comment,setComment] = useState("")
  const [show,setShow] = useState(false)

  const addComment = async (e) =>{
    const keyCode = e.keyCode
    if(keyCode === 13){
      try{
        const res = await secureApi.patch(`posts/${post?.id}/comment`,{comment})
        console.log(res)
        if(res?.status === 200){
          let comments = [...res.data.comments]
          setComments(comments)
          onCommentCount(comments?.length)
          setComment('')
        }
      }catch(err){
         console.error(err);
      }
    }
  }
 
  return (
    <>
    <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                        user?.avatar
                    }`} alt="user avatar" />

            <div className="flex-1">
              <input 
              value={comment}
              onChange={e=>setComment(e.target.value)}
              onKeyDown={(e) => addComment(e)}
              type="text"
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
        show &&  <CommentHistory comments={comments} />
       }

          </>
  )
}

export default CommentBox