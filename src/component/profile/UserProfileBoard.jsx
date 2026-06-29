
import ProfileInfo from './ProfileInfo'
import UserPostBoard from '../post/UserPostBoard'
import { useSelector } from 'react-redux'

const UserProfileBoard = () => {
  const {posts} = useSelector(s=>s.profile)
  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        
        <ProfileInfo/>

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

        <UserPostBoard posts = {posts} />
      </div>
    </main>
  )
}

export default UserProfileBoard