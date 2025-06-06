import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { getGeneratedPassword, getNewPassword } from './data'
import WebsiteList from './WebsiteList'

const SavedPasswords = () => {
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState(getNewPassword())
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passwords, setPasswords] = useState([])

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || []
    setPasswords(storedPasswords)
  }, [])

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleDelete = (index) => {
    const updatedPasswords = [...passwords]
    updatedPasswords.splice(index, 1)
    setPasswords(updatedPasswords)
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords))
  }

  function cleanDomain(input) {
    // Remove "www." and ".com" if present
    const cleanedInput = input
      .replace(/\s/g, '')
      .toLowerCase()
      .replace(/^www\./i, '')
      .replace(/\.com$/i, '')

    return cleanedInput
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!website || !password) {
      alert('Please enter both website and password.')
      return
    }
    const cleanedInput = cleanDomain(website)

    console.log(website)
    console.log(cleanedInput)
    const newPassword = {
      website: cleanedInput,
      username,
      password,
    }

    const newPasswords = [...passwords, newPassword]
    setPasswords(newPasswords)
    localStorage.setItem('passwords', JSON.stringify(newPasswords))

    setWebsite('')
    setUsername('')
    setPassword(getNewPassword()) // Reset the password after submission
  }

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h2 className='text-2xl font-bold mb-4 text-blue-500'>Save Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter website'
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className='w-full p-2 mb-2 border rounded'
          />

          <input
            type='text'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-2 mb-2 border rounded'
          />
          <div className='relative'>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 mb-2 border rounded'
            />
            <span
              className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'
              onClick={handleTogglePassword}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>

          <button
            type='submit'
            className='w-full p-2 bg-green-500 text-white rounded cursor-pointer'
          >
            Save Password
          </button>
        </form>

        {<WebsiteList websites={passwords} onDelete={handleDelete} />}
      </div>
    </>
  )
}

export default SavedPasswords
