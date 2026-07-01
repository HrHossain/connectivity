import { Camera, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../features/post/postSlice'
import { openModal } from '../../features/modal/modalSlice'

const PostEntry = ({onPostEntryClose}) => {
    const dispatch = useDispatch()
    const {error,posts} = useSelector(s=>s.posts)
    const {user:authUser} = useSelector(s=>s.auth)
    const {profile} = useSelector(s=>s.profile)
    const user = profile ?? authUser

    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null)
    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(!file) return
         if(file.size > 5 * 1024 * 1024){
                        dispatch(
                                openModal({
                                  type: "warning",
                                  title: "only file size maximun 5MB",
                                  redirectTo: null,
                                })
                              )
                            if (fileInputRef.current) fileInputRef.current.value = "";
                       return
                       
                    }
        
        if(!["image/jpeg","image/png"].includes(file.type)){
            
             dispatch(
                    openModal({
                        type: "warning",
                        title: "only allow png and jpeg",
                        redirectTo: null,
                    })
                    )
                   if (fileInputRef.current) fileInputRef.current.value = "";
                    return
            
        }
        setImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () =>{
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

     const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

 const handleSubmit = async (e)=>{
    e.preventDefault()
     if (!text.trim() && !imageFile) {
        dispatch(
            openModal({
                type: "info",
                title: "Do something",
                message:"Text or image you can share",
                redirectTo: null,
                    })
        )
        return     
    }
    
    const formData = new FormData()
    formData.append("content" , text.trim())
    if(imageFile){
        formData.append("image" , imageFile)
    }

     await dispatch(createPost(formData))
    setText("");
    removeImage();
 }

 useEffect(()=>{
    textareaRef.current?.focus();
 },[])

 console.log(posts)
  return (
         <div className="card relative">
            <div className="relative flex items-center justify-center mb-3">
  <h6 className="text-center text-lg font-bold lg:text-xl">
    Create Post
  </h6>

  <button
    type="button"
    onClick={()=>onPostEntryClose()}
    className="absolute right-0 text-gray-500 hover:text-white"
  >
    <X size={20} />
  </button>
</div>
            


            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-3">
                       <img
                            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                                user?.avatar
                            }`}
                            alt="avatar"
                        /> 
                        <div>
                            <h6 className="text-lg lg:text-xl">
                               {user?.firstName}{' '}{user?.lastName}
                            </h6>

                            <span className="text-sm text-gray-400 lg:text-base">
                                Public
                            </span>
                        </div>
                    </div>

                    <label
                        className="btn-primary cursor-pointer !text-gray-100"
                        htmlFor="image"
                    >
                       <Camera />
                        Add Photo
                    </label>
                    <input
                      
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        type="file"
                        name="image"
                        id="image"
                        className="hidden"
                    />
                </div>
                
                    <textarea
                        value={text}
                        ref={textareaRef}
                        onChange={(e) => setText(e.target.value)}
                        name="content"
                        id="content"
                        placeholder="Share your thoughts..."
                        className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
                    ></textarea>

                     {imagePreview && (
                    <div className="relative mt-3 rounded-lg overflow-hidden border border-gray-200">
                    <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full max-h-80 object-cover"
                    />
                    <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition"
                        aria-label="ছবি সরান"
                    >
                        <X size={16} />
                       
                    </button>
                    </div>
      )}
              
                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button
                        
                        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                        type="submit"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
  )
}

export default PostEntry