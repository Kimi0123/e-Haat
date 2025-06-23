import { useState } from 'react'


function App() {
  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
        <p className="text-lg text-gray-700">This is a simple React application with Tailwind CSS.</p>
      </div>
      <div className="flex justify-center items-center h-screen">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          Click Me
        </button>
      </div>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2023 My App. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
