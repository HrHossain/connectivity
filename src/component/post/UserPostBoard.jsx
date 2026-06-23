import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostLike from './PostLike'
import PostComment from './PostComment'
import PostShare from './PostShare'
import CommentBox from './CommentBox'
import CommentHistory from './CommentHistory'

const UserPostBoard = () => {
  return (
    <article className="card mt-6 lg:mt-8">
        <PostHeader/>
        <PostBody/>
        <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">  
         <PostLike/>
          <PostComment/>
          <PostShare/>
        </div>
        <div>
          <CommentBox/>
          <CommentHistory/>
        </div>
      </article>
  )
}

export default UserPostBoard