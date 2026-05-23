import { Routes, Route } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Film, Star, Tv2 } from "lucide-react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import HomePage from "@/pages/home/HomePage"
import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Content placeholder */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 mt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
