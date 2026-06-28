
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from "../../assets/icons/edit.svg"
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { editProfileBio } from '../../features/profile/profileSlice'
const Bio = () => {
    const {profile,error} = useSelector(state=>state.profile)
    const dispatch = useDispatch()
    const [editMode,setEditMode] = useState(false)
    const [bio,setBio] = useState('')
    const handleEditBio = async () =>{
       try{
        const res = await dispatch(editProfileBio({id:profile?.id,bio})).unwrap()
        console.log(res)
         
             setEditMode(false)
         
       }catch(err){
        console.log(err)
       }
      
       
    }

    useEffect(()=>{
        setBio(profile?.bio)
    },[profile])

   
  return (
  
            <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div>
              {
                !editMode ? 
                <p className="leading-[188%] text-gray-400 lg:text-lg">
                {
                  profile?.bio ? profile?.bio : "Add Bio"
                } 
              </p> :
              <div className="w-full border-red-600  bg-gray-800 rounded-xl shadow-lg p-6">
  
                    <h2 className="text-2xl font-bold text-gray-800">Edit Bio</h2>
                    <p className="text-sm text-gray-500 mt-1">
                    Tell people a little about yourself.
                    </p>

                    {/* Textarea */}
                    <div className="mt-5">
                    <textarea
                        value={bio}
                        onChange={(e)=>setBio(e.target.value)}
                        rows={6}
                        maxLength={200}
                        cols={200}
                        placeholder="Write something about yourself..."
                        className="w-full bg-gray-700 resize-none rounded-xl border border-gray-300 p-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                        Maximum 200 characters
                    </span>

                    
                    </div>
            </div>
              }
            </div>
            
            {
                !editMode ? 
                <button onClick={()=>setEditMode(true)} className="flex-center h-7 w-7 rounded-full">
                <img src={EditIcon} alt="Edit" />
                </button>
                :
                <button  
                onClick={()=>handleEditBio()}
                className="flex-center h-7 w-7 rounded-full">
                <Check />
                </button>
            }
          </div>
          
          
    

   
  )
}

export default Bio