
import { useEffect } from "react"
import WhatsOnMind from "../component/WhatsOnMind"
import UserPostBoard from "../component/post/UserPostBoard"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../features/post/postSlice"
import { LoaderCircle } from "lucide-react"

const HomePage = () => {
  const {loading,error,posts} = useSelector(s=>s.posts)
  const dispatch = useDispatch()
useEffect(()=>{
 dispatch(getPosts())
},[])

if(loading){
  return <LoaderCircle />
}
if(error){
  return <p>{error?.message}</p>
}
  return (
    
  <main className="mx-auto max-w-[1020px] py-8">
    <div className="container">

      <WhatsOnMind/>

      <UserPostBoard posts={posts}/>
     
    </div>
    </main>
  

  )
}

export default HomePage