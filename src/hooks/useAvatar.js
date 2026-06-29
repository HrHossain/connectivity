import { useSelector } from 'react-redux'

const useAvatar = (post) => {
    const {user} = useSelector(s=>s.auth)
    const isMe = post?.author?.id === user?.id
    const avatar = isMe ? `${user?.avatar}` : `${post?.author?.avatar}`
     const avatarURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;
     
  return {avatarURL}
}

export default useAvatar