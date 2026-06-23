import { useSelector } from "react-redux"
import { Outlet ,Navigate } from "react-router-dom"
import Header from "../component/Header"
const ProtectedRoutes = () => {
    const auth = useSelector(state=>state.auth)
  return (
    <>
     {
        auth.user ? (
            <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <Header/>
                <Outlet/>
                </div>
            </main>
        ):( <Navigate to ="/login"/>)
     }
    </>
  )
}

export default ProtectedRoutes