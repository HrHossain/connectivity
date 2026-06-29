
import CommentIcon from "../../assets/icons/comment.svg"
const PostComment = ({post}) => {
  return (
    <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
            <img src={CommentIcon} alt="Comment" />
            <span>Comment {post?.comments?.length ?? 0}</span>
          </button>
  )
}

export default PostComment