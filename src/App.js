import React, { useEffect, useState }  from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getAllRepositories();
  }, []) 

  async function handleAddRepository() {
    const newRepository = {
      title: "titulo",
      url: 123,
      techs: ["Java","C","GoLang","C#", "JavaScript"]
    }
    const response = await api.post('repositories', newRepository);
    if(response.status === 201){
     const newRepositories = response.data;
     
      setRepositories([...repositories, newRepositories]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204){
      const index = repositories.findIndex(repository => repository.id === id);
      repositories.splice(index,1);

      setRepositories([...repositories, repositories]);
    }

  }

  async function getAllRepositories() {

    const response = await api.get('repositories');
    const newRepositories = response.data;

    setRepositories([...repositories, ...newRepositories]);
  }


  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((repository, index) => (
        <div key={index}>
          <li key={`li ${index}`}>{repository.title}</li> 
          <button key={`button ${repository.id}`} hidden={repository.id ? false : true} onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </div>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
