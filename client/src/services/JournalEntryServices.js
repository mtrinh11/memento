import ApiClient from './ApiClient';

export const LogEntry = async (formData, userId) => {
    try {
      const res = await ApiClient.post(`/journal/create/${userId}`, formData)
      return res.data
    } catch (error) {
      throw error
    }
  }

export const GetEntry = async (entryId) => {
  try {
    const res = await ApiClient.get(`/journal/one/${entryId}`)
    return res.data;
  } catch (error) {
    throw error
  }
}

export const GetAllEntrys = async(userId) => {
  try {
    const res = await ApiClient.get(`/journal/${userId}`);
    return res.data;
  } catch (error) {
    throw error
  }
}

export const DeleteEntry = async(userId, entryId) => {
  try {
    const res = await ApiClient.delete(`/journal/delete/${userId}/${entryId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const EditEntry = async(postId,formData) => {
  try {
    const res = await ApiClient.put(`/journal/update/${postId}`, formData)
    return res.data
  } catch (error) {
    throw error
  }
}