import axios from 'axios'

export const loginUser = async (username: string, password: string) => {
    const res = await axios.post(
      'https://dummyjson.com/auth/login',
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    return res.data
  }
  export const registerUser = async (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const res = await axios.post(
      'https://dummyjson.com/users/add',
      {
        username,
        email,
        password,
        firstName,
        lastName,
        age: 25, 
        image: 'https://robohash.org/default-user.png'
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
  };