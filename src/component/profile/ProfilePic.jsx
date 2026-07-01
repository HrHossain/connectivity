import { UserRoundArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import EditIcon from "../../assets/icons/edit.svg"
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../features/modal/modalSlice'
import { editProfileAvatar } from '../../features/profile/profileSlice'
const ProfilePic = () => {
    const {profile,loading,error} = useSelector(s=>s.profile);
    
    
    const dispatch = useDispatch()
    const fileUploadedRef = useRef()

    const hanldleImageUpload = e =>{
        e.preventDefault()
        fileUploadedRef.current.addEventListener("change",updateImageDisplay)
        fileUploadedRef.current.click()
    }

    const updateImageDisplay = async ()=>{ 
        const formData = new FormData()
        for(const file of fileUploadedRef.current.files){
            if(!file) return;
            if(file.size > 5 * 1024 * 1024){
                dispatch(
                      openModal({
                        type: "warning",
                        title: "too much file size",
                        message: "Maximum 5MB",
                        
                      }))
               return
            }

            if(!["image/jpeg","image/png"].includes(file.type)){
                 dispatch(
                      openModal({
                        type: "warning",
                        title: "Only JPG and PNG",
                        message: "Sorry my dear user",
                        
                      }))
                      return
            }

        // ready for going to db
        formData.append("avatar", file)

        await dispatch(editProfileAvatar({id:profile?.id,formData}))
        }
    }

    
    if(error){
        dispatch(
                openModal({
                type: "error",
                title: "uploading profile error!",
                }))}
  return (
    <div
            className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
          >
           

            {
            profile?.avatar ? <img className="w-[200px] h-[200px] rounded-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${profile?.avatar}`} alt={profile?.firstName} /> : 
            <UserRoundArrowLeft />
          }

            <form id='form' encType='multipart/form-data'>
                <button
                    onClick={(e)=>hanldleImageUpload(e)}
                    className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            >
            <img src={EditIcon} alt="Edit" />
            </button>
            <input type='file' id='file' ref={fileUploadedRef} hidden />
            </form>
          </div>
  )
}

export default ProfilePic