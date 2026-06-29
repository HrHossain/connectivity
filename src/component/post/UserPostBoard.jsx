
import { useSelector } from 'react-redux'
import PostCard from './PostCard'

const UserPostBoard = () => {
  const {posts,loading} = useSelector(state=>state.profile)
  const {user} = useSelector(state=>state.auth)
  console.log(user)
  if(loading){
    return <p>post loading...</p>
  }
  return (
  <>
   {
    posts.length > 0 ? posts.map(post=><PostCard key={post.id} post={post}/>) : "No Posts Available"
   }
  </>
  )
}

export default UserPostBoard