import { Route, Routes } from "react-router-dom"
import Appbar from "./components/Appbar"
import Signup from "./pages/Signup"
import useAuth from "./hooks/useAuth"
import { Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import 'mapbox-gl/dist/mapbox-gl.css';
function App() {
  const {user} = useAuth()
  return (
    <div className="h-screen w-screen">
      <Appbar title="Hello World" />
      <Routes>
        {
          user ?
          <>
        <Route path="/signup" element={<Navigate to={'/home'} />} />
        <Route path="/signin" element={<Navigate to={'/home'} />} />
        <Route path="/home" element={<Home/>} />
          </>:
          <>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Navigate to={'/signup'} />} />
          </>
        }

      </Routes>
    </div>
  )
}

export default App
