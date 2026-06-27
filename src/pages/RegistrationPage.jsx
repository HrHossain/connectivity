import { Link } from "react-router-dom"
import RegisterSVG from "../assets/images/auth_illustration.png"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { registerUser } from "../features/auth/authSlice"
import { openModal } from "../features/modal/modalSlice"

const RegistrationPage = () => {
   const dispatch = useDispatch()
  const {isLoading,error,user} = useSelector(state => state.auth)
const [form,setForm] = useState({
  "email": "",
  "password": "",
  "firstName": "",
  "lastName": ""
})
 

  const handleChange = e =>{
    setForm({...form , [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
       await dispatch(registerUser(form))
       dispatch(
  openModal({
    type: "success",
    title: "Success",
    message: "Registration successful",
    redirectTo: "/login",
  })
);
     
    }catch(err){
      console.log(err.message)
    }
  }
 
  
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-deepDark py-8"
    >
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          
          <div>
            
            <img
              className="mb-12 h-60"
              src={RegisterSVG}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]"><span className="text-blue-900">Con</span>nectivity</h1>
              <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                Create a social media app with features like, showing the post,
                post details, reactions, comments and profile.
              </p>
            </div>
          </div>
          
       
          {/* Form */}
        <form onSubmit={handleSubmit}  className="space-y-5 border-b border-[#3F3F3F] pb-8">
          
          <div className="form-control">
            <label className="auth-label" htmlFor="name">
              firstame
            </label>
            <input
              className="auth-input"
              type="text"
              id="firstName"
              name="firstName"          
              onChange={handleChange}
              placeholder="Your first name"
              required
            />
          </div>

          <div className="form-control">
            <label className="auth-label" htmlFor="name">
              Lastname
            </label>
            <input
              className="auth-input"
              type="text"
              id="lastName"
              name="lastName"
             
              onChange={handleChange}
              placeholder="Your last name"
              required
            />
          </div>

          <div className="form-control">
            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              className="auth-input"
              type="email"
              id="email"
              name="email"
              
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-control">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              className="auth-input"
              type="password"
              id="password"
              name="password"
             
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-control">
            <label className="auth-label" htmlFor="confirmPassword">
              Retype Password
            </label>
            <input
              className="auth-input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all duration-200 hover:opacity-90 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-lwsGreen"
          >
           {
            isLoading ? "Registering" : "Register"
           }
          </button>
        </form>

        {
          error && <p className="text-red-800">{error}</p>
        }
      {user && <p style={{ color: "green" }}>Registered Successfully!</p>}
        {/* Footer */}
        
        <div className="pt-6 text-right">
          <p className="text-xs text-gray-400 lg:text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-white transition hover:text-lwsGreen hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

          
        </div>
      </div>
    </main>
  )
}

export default RegistrationPage