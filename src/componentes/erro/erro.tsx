import { useSearchParams } from "react-router-dom";

export default function Erro() {
    const [searchParams] = useSearchParams()
    const mensagem = searchParams.get("message")
    return (
        <>
            <h1>Página de Erro</h1>
            {mensagem && <p>{mensagem}</p>}

        </>
    )
}