
import './App.css'
import { useEffect, useState } from 'react'

type ProdutoType = {
  _id: string,
  nome: string,
  preco: number,
  urlfoto: string,
  descricao: string
}

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  useEffect(() => {
    fetch('api/produtos')
      .then((response) => response.json())
      .then((data) => setProdutos(data))
  }, [])


  function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    fetch('api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: formData.get('nome'),
      })
    })
      .then((response) => response.json())
      .then((newProduto) => {
        setProdutos((prevProdutos) => [...prevProdutos, newProduto])
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    form.reset()
  }

  return (
    <>
      <div>Cadastro de Produtos</div>
      <form onSubmit={handleForm}>
        <input type="text" name="nome" placeholder="Nome" required />
        <input type="number" name="preco" placeholder="Preço" required />
        <input type="text" name="urlfoto" placeholder="URL da Foto" required />
        <textarea name="descricao" placeholder="Descrição" required></textarea>
        <button type="submit">Cadastrar</button>
      </form>
      <div>LISTA DE PRODUTOS</div>
      {
        produtos.map((produto) => (
          <div key={produto._id}>
            <h2>{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p>{produto.preco}</p>
            <img src={produto.urlfoto} alt={produto.nome} width="200" /></div>
        ))
      }
    </>
  )
}
