import ApiClient from './ApiClient';

export const LogEntry = async (formData, userId) => {
    try {
        console.log(`/journal/create/${userId}`)
      const res = await ApiClient.post(`/journal/create/${userId}`, formData)
      return res.data
    } catch (error) {
      throw error
    }
  }