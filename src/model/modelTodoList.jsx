import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL

export const modelGetAll = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/products`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const modelGetOnceByID = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/products/${id}`)
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const modelUpdateByID = async (id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/products/${id}`)
        return res.data;
    } catch (error) {
        console.error('Error update data:', error);
        throw error;
    }
}


export const modelDeleteByID = async (id) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/api/v1/products/${id}`)
        return res.data;
    } catch (error) {
        console.error('Error delete data:', error);
        throw error;
    }
}