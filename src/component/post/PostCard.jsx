import React from 'react'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostLike from './PostLike'
import PostComment from './PostComment'
import PostShare from './PostShare'
import CommentBox from './CommentBox'
import CommentHistory from './CommentHistory'

const PostCard = ({post}) => {
  return (
    <article className="card mt-6 lg:mt-8">
        <PostHeader post={post}/>
        <PostBody post={post}/>
        <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">  
         <PostLike post={post}/>
          <PostComment post={post}/>
          <PostShare post={post}/>
        </div>
        <div>
          <CommentBox post={post}/>
          <CommentHistory post={post}/>
        </div>
      </article>
  )
}

export default PostCard