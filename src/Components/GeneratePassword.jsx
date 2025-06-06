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
    <div className='w-full max-w-md mx-auto shadow-lg rounded-md px-6 py-4 my-8 bg-gray-800 text-gray-200'>
      <h2 className='text-2xl font-semibold mb-4 text-blue-400'>
        Generate Password
      </h2>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-2 px-3 rounded-l-md bg-gray-700 text-white'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 shrink-0 rounded-r-md'
        >
          <FontAwesomeIcon icon={faCopy} className='mr-1' />
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
          className='w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded-md cursor-pointer'
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
