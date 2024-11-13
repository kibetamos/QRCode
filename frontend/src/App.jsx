import react from "react"
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Event_details from "./pages/Event_details"
import Event from "./pages/Events"
import CreateOrder from "./pages/CreateOrder"
import About_Event from "./pages/About_Event"
import Orders from "./pages/Orders"
import ScanQRCode from './pages/ScanQRCode';


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/api/orders/:id/" element={<Event_details />} />
        {/* <Route path="/api/events/:id/create_order" element={<CreateOrder />} />
         */}
                         <Route path="/scan-qrcode" element={<ScanQRCode />} />
          {/* <Route path="/orders/create/:id" element={<CreateOrder />} /> */}
         <Route path="/api/events/:id/create_order" element={<CreateOrder />} />
        <Route path="/api/events/:id" element={<About_Event />} />
        {/* <Route path="/event" element={<Event />}  */}
        <Route path="/event" element={<Event />} />
        {/* <Route path="/order" */}
        <Route path="/api/orders/" element={< Orders />} />


              </Routes>
    </BrowserRouter>
  )
}

export default App