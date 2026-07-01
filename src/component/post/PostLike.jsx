import { useState } from "react"
import LikeIcon from "../../assets/icons/like.svg"
import { useSelector } from "react-redux"
import secureApi from "../../api/axiosSecure";
import { Heart, HeartPlus} from "lucide-react";
const PostLike = ({post}) => {
  const {user} = useSelector(s=>s.auth)
  const [liked,setLiked] = useState(post?.likes?.includes(user?.id))
  const [count,setCount] = useState(post?.likes?.length)
  const handleLike = async () =>{
    try{
      const res = await secureApi.patch(`posts/${post?.id}/like`)
      if (res.status === 200) {
                setLiked(true);
                setCount(c=>c+1)
            }
    }catch(err){
      console.error(err);
            setLiked(false);
    }

  }
  
  return (
     <button
      onClick={handleLike}
     className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
            {liked ? <HeartPlus /> : <Heart />}{count}
            
            {!liked && <span>Like</span>}
          </button>
  )
}

export default PostLike