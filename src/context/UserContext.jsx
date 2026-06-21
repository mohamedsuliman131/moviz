import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

  function login(userData) {
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
