import { Link, useNavigate } from "react-router-dom"
import illustration from "../assets/illustration.jpg"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { loginUser } from "../features/auth/authSlice"

const LoginPage = () => {
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setFormError("")

    if (!email.trim() || !password) {
      setFormError("Please fill in both email and password")
      return
    }

    try {
      await dispatch(loginUser({ email: email.trim(), password })).unwrap()
      // redirect handled by the isAuthenticated effect below
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Invalid email or password. Please try again."
      setFormError(message)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  return (
    <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div className="max-w-[1568px] flex-1">
        <div className="container grid items-center justify-items-center gap-8 lg:grid-cols-2">
          <div>
            <img
              className="mb-12 h-[400px] max-w-full max-lg:hidden"
              src={illustration}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                <span className="text-blue-950">Con</span>nectivity
              </h1>
              <p className="max-w-[452px] text-gray-600/95 lg:text-lg">
                Create a social media app with features like, showing the
                post, post details, reactions, comments and profile.
              </p>
            </div>
          </div>

          <div className="card w-full max-w-md">
            <form
              onSubmit={handleLogin}
              noValidate
              className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
            >
              <div className="form-control">
                <label className="auth-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="auth-input"
                  name="email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-control">
                <label className="auth-label" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="auth-input pr-16"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-lwsGreen"
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {formError && (
                <p className="mt-3 text-center text-sm text-red-500" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="auth-input mt-2 flex items-center justify-center gap-2 bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-deepDark border-t-transparent" />
                )}
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="py-4 lg:py-6">
              <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  className="text-white transition-all hover:text-lwsGreen hover:underline"
                  to="/register"
                >
                  Create New
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage