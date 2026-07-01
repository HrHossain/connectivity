import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  const {token} = useSelector(s=>s.auth)
  console.log(token)
  return (
    <main className="flex min-h-screen items-center justify-center bg-deepDark px-4">
      <div className="text-center max-w-md">
        
       
        <h1 className="text-7xl font-extrabold text-lwsGreen mb-4">404</h1>

        
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mb-8 text-sm text-gray-400 lg:text-base">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="rounded-lg bg-lwsGreen px-6 py-2 font-semibold text-deepDark transition hover:opacity-90"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-gray-600 px-6 py-2 font-semibold text-white transition hover:border-lwsGreen hover:text-lwsGreen"
          >
            Login
          </Link>
        </div>

      </div>
    </main>
  )
}

export default NotFoundPage
