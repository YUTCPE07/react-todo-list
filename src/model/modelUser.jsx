import axios from 'axios'
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD


export const getUserByLogin = async (username,password) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if(username!==ADMIN_USERNAME || password!==ADMIN_PASSWORD){
            throw new Error("Notfound user, please check username,password")
        }
        return {"username":username}
    } catch (error) {
        console.error('Error authentication :', error)
        throw error;
    }
}