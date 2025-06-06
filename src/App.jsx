import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  Navigate,
} from 'react-router-dom'
import GeneratePassword from './Components/GeneratePassword'
import SavedPasswords from './Components/SavedPasswords'
import './Components/Nav.css'

const App = () => {

  return (
    <Router>
      <div>
        {/* Top Navbar */}
        <nav className='bg-gray-800 text-white p-4 flex'>
          <h1 className='text-xl font-bold mr-4 text-blue-600'>
            Password Manager
          </h1>
          <NavLink
            to='/generate-password'
            className={({ isActive }) =>
              isActive ? 'activenav navbar__li-box inline' : 'navbar__li-box inline'
            }
          >
            Generate
          </NavLink>
          <NavLink
            to='/saved-passwords'
            className={({ isActive }) =>
              isActive ? 'activenav navbar__li-box inline' : 'navbar__li-box inline'
            }
          >
            Saved
          </NavLink>
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
