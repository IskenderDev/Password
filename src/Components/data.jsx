let commonData = {
  password: '',
}

let numberAllowed = false
let charAllowed = false
let length = 8

export const setGeneratedPassword = (newPassword) => {
  commonData.password = newPassword
}

export const getNewPassword = () => {
  return getGeneratedPassword(numberAllowed, charAllowed, length)
}

export const getGeneratedPassword = (numAllowed, charAlwd, len) => {
  setNumberAllowed(numAllowed)
  setCharAllowed(charAlwd)
  setLength(len)

  let pass = ''
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  if (numAllowed) str += '0123456789'
  if (charAlwd) str += '!@#$%^&*-_+=[]{}~'

  for (let i = 1; i <= len; i++) {
    let char = Math.floor(Math.random() * str.length)
    pass += str.charAt(char)
  }
  return pass
}

export const setNumberAllowed = (value) => {
  numberAllowed = value
}

export const setCharAllowed = (value) => {
  charAllowed = value
}

export const setLength = (value) => {
  length = value
}
