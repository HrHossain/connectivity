
import WhatsOnMind from "../component/WhatsOnMind"
import UserPostBoard from "../component/post/UserPostBoard"

const HomePage = () => {

  
  return (
    
  <main className="mx-auto max-w-[1020px] py-8">
    <div className="container">

      <WhatsOnMind/>

      <UserPostBoard/>
     
    </div>
    </main>
  

  )
}

export default HomePage