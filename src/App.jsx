import Directory from './Directory';
import Attendance from './pages/Attendance'
import TimeOff from './pages/timeoff'
import MyProfile from './pages/MyProfile'
import EmployeeProfile from './pages/EmployeeProfile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignIn, SignUp } from './pages/Auth'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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