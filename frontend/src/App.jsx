import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

function App() {
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate(); // useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/login', {
        userName,
        password
      })
      localStorage.setItem('token', response.data.token)
      setErrorMessage("")
      navigate('/dashboard'); // navigate to dashboard
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage("An error occurred. Please try again.")
      }
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default App
