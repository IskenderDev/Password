import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  Navigate,
} from 'react-router-dom'
import GeneratePassword from './Components/GeneratePassword'
import SavedPasswords from './Components/SavedPasswords'

const App = () => {

  return (
    <Router>
      <div>
        {/* Top Navbar */}
        <nav className='bg-gray-900 text-white px-6 py-4 flex items-center gap-4 shadow-md'>
          <h1 className='text-xl font-semibold mr-auto text-blue-500'>
            Password Manager
          </h1>
          <NavLink
            to='/generate-password'
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`
            }
          >
            Generate
          </NavLink>
          <NavLink
            to='/saved-passwords'
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`
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
