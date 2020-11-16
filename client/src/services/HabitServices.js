import ApiClient from './ApiClient';

export const GetHabits = async(userId) => {
    try {
        const res = await ApiClient.get(`/habits/current/${userId}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const CreateTracker = async(userId) => {
    try {
        const res = await ApiClient.post(`/habits/create/${userId}`);
        return res.data;
    } catch (error) {
        throw error
    }
}

export const UpdateTracker = async(habitsId, formData) => {
    try {
        const res = await ApiClient.put(`/habits/update/${habitsId}`, formData);
        return res.data;
    } catch (error) {
        throw error
    }
}

export const DeleteTracker = async(userId, habitId) => {
    try {
        const res = await ApiClient.delete(`/habits/delete/${userId}/${habitId}`)
        return res.data
    } catch (error) {
        throw error
    }
}