import React, { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const[input, setInput] = useState('');
  const [cep, setCep] = useState({});

   async function handleSearch(){
    //01310930/json 69010-110
    if(input === ''){
      alert("O campo de CEP está vazio!");
      return
    }

    //await espera a requisição
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch{
      alert("Erro na pesquisa do CEP");
      setInput("")
    }

  }


  return (
    <div className="container">
      <h1 className="title">Pesquisar CEP</h1>

      <div className="containerInput">
        <input type="text"
        placeholder="Pesquise por um CEP"
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#1C1C1C"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 &&(

      <main className="main">
        <h2> CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>

      )}

      
    </div>
  );
}

export default App;
