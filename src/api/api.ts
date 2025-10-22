import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.code === 'ERR_NETWORK') {
            window.location.href = `/login?message=${encodeURIComponent("Ligue o servidor!")}`;
        }
        const status = error?.response?.status;
        if (status === 401&&!(error?.response?.config?.url?.endsWith('/login'))) {
            localStorage.removeItem("token")
            window.location.href = `/login?message=${encodeURIComponent("Token inválido!")}`
        }
        return Promise.reject(error)
    }
)



export default api