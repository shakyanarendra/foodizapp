import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"
import "../App.css"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0 backset">
       <header>
         <Navbar/>
       </header>

       {/* MAIN CONTENT */}
       <div className="flex-1 ">
          <Outlet/>
       </div>

       <footer>
         <Footer/>
       </footer>
    </div>
  )
}

export default MainLayout
