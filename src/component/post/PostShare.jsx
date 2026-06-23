import ShareIcon from "../../assets/icons/share.svg"

const PostShare = () => {
  return (
    <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
            <img src={ShareIcon} alt="Share" />
            <span>Share</span>
          </button>
  )
}

export default PostShare