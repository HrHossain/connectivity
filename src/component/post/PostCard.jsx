import React, { useState } from 'react'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostLike from './PostLike'
import PostComment from './PostComment'
import PostShare from './PostShare'
import CommentBox from './CommentBox'


const PostCard = ({post}) => {
   const [commentCount,setCommentCount] = useState(post?.comments?.length)
  return (
    <article className="card mt-6 lg:mt-8">
        <PostHeader post={post}/>
        <PostBody poster={post?.image} content={post?.content}/>
        <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">  
         <PostLike post={post}/>
          <PostComment count={commentCount}/>
          <PostShare post={post}/>
        </div>
        <div>
          <CommentBox onCommentCount={setCommentCount} post={post}/>
          
        </div>
      </article>
  )
}

export default PostCard