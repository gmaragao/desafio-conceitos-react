import React, { useEffect, useState}  from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getAllRepositories();
  }, []) 


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repo ${Date.now()}`,
      url: 'https://github.com/gmaragao',
      techs: [ 'Java', 'C','Python', 'JavaScript']
    });
    
      const repo = response.data;
      setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204){
      const index = repositories.findIndex(repository => repository.id === id);
      repositories.splice(index,1);
      setRepositories([...repositories]);
    }
  }

  async function getAllRepositories() {

    const response = await api.get('repositories');
    const dataFromDB = response.data;

    setRepositories(dataFromDB);
  }


  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button key={repository.url} onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
