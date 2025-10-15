import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/api";

export default function Login(){
const navigate = useNavigate()

const [searchParams] = useSearchParams()

const mensagem = searchParams.get("message")


function handleSubmit(event:React.FormEvent<HTMLFormElement>){
event.preventDefault()

const formData = new FormData(event.currentTarget)
const email = formData.get("email")
const senha = formData.get("senha")


api.post("/login",{
email,
senha
}).then(resposta=>{
if(resposta.status===200){
localStorage.setItem("token",resposta?.data?.token)
navigate("/")
}
            else if(resposta.status ===400){
                navigate(`/login?messagem=${resposta?.data?.messagem}`)
            }
        }).catch((error:any)=>{
            const msg = error?.response?.data?.mensagem || 
                        error?.mensagem || 
                        "Erro Desconhecido!"
            navigate(`/login?message=${encodeURIComponent(msg)}`)
})
}


return(
<>
<h1>Login</h1>
{mensagem&&<p>{mensagem}</p>}
<form onSubmit={handleSubmit}>
<input type="text" name="email" id="email" />
<input type="password" name="senha" id="senha" />
<button type="submit">Entrar</button>
</form>
</>
)
}