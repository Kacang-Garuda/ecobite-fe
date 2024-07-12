'use client'
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import { User } from '../interface'

interface AuthenticationContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined)
export const useAuth = (): AuthenticationContextType => {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token')

      if (token) {
        setIsLoading(true)
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          console.log(response.data.data)
          if (response.data) {
            setIsLoggedIn(true)
            setUser(response.data.data)
          }
        } catch (error) {
          console.error('Failed to fetch user data', error)
          setIsLoggedIn(false)
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserData()
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
