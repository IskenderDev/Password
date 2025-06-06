import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from 'react-router-dom'
import GeneratePassword from './Components/GeneratePassword'
import SavedPasswords from './Components/SavedPasswords'
import { useState } from 'react'
import './Components/Nav.css'

const App = () => {
  const [currentPage, setCurrentPage] = useState('/generate-password')

  const handleNavItemClick = (page) => {
    setCurrentPage(page)
  }

  return (
    <Router>
      <div>
        {/* Top Navbar */}
        <nav className='bg-gray-800 text-white p-4 flex'>
          <h1 className='text-xl font-bold mr-4 text-blue-600'>
            Password Manager
          </h1>
          <div
            className={` ${
              currentPage === '/generate-password' ? 'activenav' : ''
            } navbar__li-box inline`}
            onClick={() => handleNavItemClick('/generate-password')}
          >
            <Link to='/generate-password'>Generate</Link>
          </div>
          <div
            className={` ${
              currentPage === '/saved-passwords' ? 'activenav' : ''
            } navbar__li-box inline`}
            onClick={() => handleNavItemClick('/saved-passwords')}
          >
            <Link to='/saved-passwords'>Saved</Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className='p-4'>
          {/* Route Configuration */}
          <Routes>
            <Route path='/generate-password' element={<GeneratePassword />} />
            <Route path='/saved-passwords' element={<SavedPasswords />} />
            {/* Default route */}
            <Route
              path='/'
              element={<Navigate to='/generate-password' replace />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
