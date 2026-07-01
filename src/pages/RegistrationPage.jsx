import { Link, useNavigate } from "react-router-dom"
import RegisterSVG from "../assets/images/auth_illustration.png"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { registerUser, resetAuthError } from "../features/auth/authSlice"
import { openModal } from "../features/modal/modalSlice"

const initialForm = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
}

const RegistrationPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.auth)

  const [form, setForm] = useState(initialForm)
  const [formError, setFormError] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (formError) setFormError("")
  }

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match"
    }
    if (form.password.length < 8) {
      return "Password must be at least 8 characters"
    }
    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validate()
    if (validationError) {
      setFormError(validationError)
      dispatch(
        openModal({
          type: "error",
          title: "Registration problem",
          message: validationError,
          redirectTo: null,
        })
      )
      return
    }

    const { confirmPassword, ...payload } = form

    try {
      
      await dispatch(registerUser(payload)).unwrap()

      dispatch(
        openModal({
          type: "success",
          title: "Success",
          message: "Registration successful",
          redirectTo: "/login",
        })
      )
      setForm(initialForm)
      navigate("/login")
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Something went wrong. Please try again."

      dispatch(
        openModal({
          type: "error",
          title: "Registration problem",
          message:message,
          redirectTo: null,
        })
      )
      dispatch(resetAuthError())
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div>
            <img
              className="mb-12 h-60"
              src={RegisterSVG}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                <span className="text-blue-900">Con</span>nectivity
              </h1>
              <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                Create a social media app with features like, showing the
                post, post details, reactions, comments and profile.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 border-b border-[#3F3F3F] pb-8"
            >
              <div className="form-control">
                <label className="auth-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  className="auth-input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-control">
                <label className="auth-label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  className="auth-input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  required
                  disabled={isLoading}
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
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
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
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={8}
                  required
                  disabled={isLoading}
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
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              {formError && (
                <p className="text-sm text-red-500" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all duration-200 hover:opacity-90 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-lwsGreen disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>

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
      </div>
    </main>
  )
}

export default RegistrationPage