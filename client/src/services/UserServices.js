import ApiClient from './ApiClient';

export const GetProfile = async (userId) => {
  try {
    const res = await ApiClient.get(`/users/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (formData) => {
  try {
    const res = await ApiClient.post('/users/register', formData)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await ApiClient.get('/users/refresh/session')
    return res.data
  } catch (error) {
    throw error
  }
}

export const LoginUser = async (userData) => {
  try {
    const res = await ApiClient.post('/users/login', userData)
    localStorage.setItem('token', res.data.token)
    // console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}
