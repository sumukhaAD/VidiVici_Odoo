import Directory from './Directory';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Login() { return <h1>Login Page</h1> }
function Signup() { return <h1>Signup Page</h1> }
function EmployeeProfile() { return <h1>Employee Profile (view-only)</h1> }
function MyProfile() { return <h1>My Profile</h1> }
function Attendance() { return <h1>Attendance</h1> }
function TimeOff() { return <h1>Time Off</h1> }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Directory />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/time-off" element={<TimeOff />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App