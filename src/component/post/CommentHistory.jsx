import Avatar1 from "../../assets/images/avatars/avatar_1.png"
import Avatar2 from "../../assets/images/avatars/avatar_2.png"

const CommentHistory = () => {
  return (
    <>

    <div className="mt-4">
            <button className="text-gray-300 max-md:text-sm">
              All Comment ▾
            </button>
          </div>
         
          <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
    
            <div className="flex items-center gap-3 pt-4">
              <img className="max-w-6 max-h-6 rounded-full" src={Avatar1} alt="avatar" />
              <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                  <span>Rana khan: </span>
                  <span>Great Mofazzel Hossain ❤</span>
                </div>
              </div>
            </div>
     

          
            <div className="flex items-center gap-3 pt-4">
              <img className="max-w-6 max-h-6 rounded-full" src={Avatar2} alt="avatar" />
              <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                  <span>Mofazzel Hossain: </span>
                  <span>Great Rana Khan ❤</span>
                </div>
              </div>
            </div>
            
          </div>
    </>
  )
}

export default CommentHistory