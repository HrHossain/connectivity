

import PostCard from './PostCard'

const UserPostBoard = ({posts}) => {
  
  return (
  <>
   {
    posts?.length > 0 ? posts.map(post=><PostCard key={post.id} post={post}/>) : "No Posts Available"
   }
  </>
  )
}

export default UserPostBoard