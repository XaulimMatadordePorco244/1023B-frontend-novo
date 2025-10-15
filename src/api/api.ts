import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:8000"
})


api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token")
    if(token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})


api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        const status = error?.response?.status;
        if(status===401){
            localStorage.removeItem("token")
            window.location.href='/login?message=Token inválido!'
        }
        return Promise.reject(error)
    }
)



export default api