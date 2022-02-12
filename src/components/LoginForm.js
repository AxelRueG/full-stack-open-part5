import React, { useState } from 'react'
import Message from './Message'
import blogService from '../services/blogs'

const LoginForm = ({ handleUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messageError, setMessageError] = useState(null)

  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    blogService
      .login({ username, password })
      .then((user) => handleUser(user))
      .catch(() => {
        setMessageError('ivalid credentials')
        setTimeout(() => {
          setMessageError(null)
        }, 5000)
      })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form>
        {messageError && <Message message={messageError} />}
        <div>
					username:
          <input id='u_username' type="text" value={username} onChange={handleUsername} />
        </div>
        <div>
					password:
          <input id='u_password' type="password" value={password} onChange={handlePassword} />
        </div>
        <button onClick={handleSubmit}>login</button>
      </form>
    </div>
  )
}

export default LoginForm
