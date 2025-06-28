import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
function App() {
 


  return (
    <>
    <div className="min-h-screen bg-base-200">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
         <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
    </>
  )
}

export default App
