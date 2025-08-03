import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '@api/auth'
import { toast } from 'react-toastify'

type User = {
  username: string;
  accessToken: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    }
    return null
  })
  const TEST_CREDENTIALS = {
    username: 'emilys',
    password: 'emilyspass'
  };
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const { 
        accessToken, 
        username: responseUsername,
        email,
        firstName,
        lastName,
        gender,
        image
      } = await loginUser(username, password);
      
      const loggedInUser = { 
        username: responseUsername, 
        accessToken,
        email,
        firstName,
        lastName,
        gender,
        image
      };
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      setAuthError('Invalid credentials');
      toast.error('Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
    const register = async (
      username: string,
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      setIsLoading(true);
      setAuthError(null);
      
      try {
        const newUser = await registerUser(
          username,
          email,
          password,
          firstName,
          lastName
        );
        console.log(newUser,"newUSer register checked")
        // toast.success('Login successful!');
        alert('Registration simulated successfully!\n\nNote: This is a mock API. For login, use:\nUsername: kminchelle\nPassword: 0lelplR');
        return await login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
      } catch (error) {
        // setAuthError(error?.response?.data?.message || 'Registration failed');
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/')
  }

  return { 
    user, 
    login, 
    register,
    logout, 
    isLoading,
    authError,
    isAuthenticated: !!user?.accessToken,
    clearError: () => setAuthError(null)
  }
}

export { useAuth }