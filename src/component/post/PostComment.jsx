
import CommentIcon from "../../assets/icons/comment.svg"
const PostComment = ({count}) => {
  return (
    <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
            <img src={CommentIcon} alt="Comment" />
            <span>Comment {count}</span>
          </button>
  )
}

export default PostComment