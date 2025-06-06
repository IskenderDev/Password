import { useState, useCallback, useEffect, useRef } from 'react'
import { setGeneratedPassword, getGeneratedPassword } from './data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

const GeneratePassword = () => {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [iscopy, setiscopy] = useState(false)

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = getGeneratedPassword(numberAllowed, charAllowed, length)
    setiscopy(false)
    setPassword(pass)
    setGeneratedPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    setiscopy(true)
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword, passwordGenerator])

  //Save In Local Storage for

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h2 className='text-2xl font-bold mb-4 text-blue-500'>
        Generate Password
      </h2>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >
          <img
            style={{ marginRight: '5px', display: 'inline-block' }} // Adjust the margin as needed
            width='24'
            height='24'
            src='https://img.icons8.com/material/24/copy--v1.png'
            alt='copy--v1'
          />
          {iscopy ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className='flex text-sm gap-x-2 '>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor='characterInput'>Symbols</label>
        </div>
        <button
          type='button'
          className='w-full p-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-500'
          onClick={passwordGenerator}
        >
          Generate
        </button>
      </div>
      <br></br>
    </div>
  )
}

export default GeneratePassword
