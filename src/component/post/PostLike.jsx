import LikeIcon from "../../assets/icons/like.svg"
const PostLike = () => {
  return (
     <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
            <img src={LikeIcon} alt="Like" />
            <span>Like</span>
          </button>
  )
}

export default PostLike