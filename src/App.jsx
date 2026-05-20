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
import Navbar from "./components/common/navbar"
import Footer from "./components/common/footer"
  
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Content placeholder */}
      <main className="flex-1 max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Flix App</h1>
        <p className="text-gray-600 mt-2">
          Start building your movie recommendation UI here...
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default App
