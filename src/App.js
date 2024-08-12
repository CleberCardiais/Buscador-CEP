import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from './services/api'

function App() {

const [input, setInput] = useState ('') //função para trocar o valor do estado do input
const [cep, setCep] = useState({})  //função que armazena o retorno da chamada do input

  async function handleSearch(){
          
    if(input === ''){
      alert("Preencha com um CEP válido.")
      return;
    }

    try{
      const response = await api.get(`${input}/json`); //função que busca na api o que foi digitado no input
      setCep(response.data)
      setInput("")

    }catch{
      alert("Ops, erro ao buscar :(");
      setInput("") //função que limpa o campo quando digitado um número inválido
    }

  }


  return (
    <div className='container'>
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
      <input 
      type="text"
      placeholder="Digite o CEP..."
      value={input} //valor inicial do input - onde digita o CEP
      onChange={(e) => setInput(e.target.value) } // e de evento para passar o valor novo pro estado
      />

      <button className="buttonSearch" onClick={handleSearch}> 
        <FiSearch size={25} color="#FFF"/> 
      </button>
      </div>

    {Object.keys(cep).length > 0 &&( //função que mostra o main apenas quando preencher o input
      <main className='main'>
      <h2>CEP: {cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>{cep.bairro}</span>
      <span>{cep.localidade} -{cep.uf}</span>

      </main>
    )}

    </div>
  );
}

export default App;
