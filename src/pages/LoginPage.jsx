import { Link, useNavigate} from "react-router-dom"
import illustration from "../assets/illustration.jpg"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { loginUser } from "../features/auth/authSlice"

const LoginPage = () => {
  const { isLoading, isError,isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigation = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault()
    let user = { email , password }
    try{
      if (!email.trim() || !password) alert("fill in valid info")
      await dispatch(loginUser(user)).unwrap()
       
    } catch(err){
      // handle redux automatically
    }
  }

useEffect(()=>{
  if (isAuthenticated) {
          navigation("/")
        }
},[isAuthenticated])
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-deepDark py-8"
    >
      <div className="max-w-[1568px] flex-1">
        <div className="container grid items-center justify-content-evenly gap-8 lg:grid-cols-2">
          
          <div>
            <img
              className="mb-12 h-[400px] max-w-full max-lg:hidden"
              src={illustration}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]"><span className="text-blue-950">Con</span>nectivity</h1>
              <p className="max-w-[452px] text-gray-600/95 lg:text-lg">
                Create a social media app with features like, showing the post,
                post details, reactions, comments and profile.
              </p>
            </div>
          </div>
          
          <div className="card">
            <form onSubmit={handleLogin} className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]">
              
              <div className="form-control">
                <label className="auth-label" htmlFor="email">Email</label>
                <input
                  className="auth-input"
                  name="email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="auth-label" htmlFor="password">Password</label>
                <input
                  className="auth-input"
                  name="password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
             
              <button
              type="submit"
              disabled={isLoading || (!email || !password)}
              className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 disabled:opacity-50"
              >
            {isLoading ? "Logging in..." : "Login"}
            </button>
            {isError && (
                          <p className="mt-3 text-center text-sm text-red-500">
                            Everything recheck to join our Connectivity!
                          </p>
                        )}
            </form>
            <div className="py-4 lg:py-6">
              <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                Dont have account?{" "}
                <Link
                  className="text-white transition-all hover:text-lwsGreen hover:underline"
                  to="/register"
                  >Create New</Link
                >
              </p>
            </div>
          </div>
         
        </div>
      </div>
    </main>
  )
}

export default LoginPage