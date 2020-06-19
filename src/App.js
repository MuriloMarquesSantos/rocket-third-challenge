import React, { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getRepositories = async () => {
      const response = await api.get('/repositories');
      setRepositories(response.data)
    }
    getRepositories();
  }, [])

  async function handleAddRepository() {
    const requestBody = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }
    const response = await api.post('/repositories', requestBody);

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    console.log("calling delete repo with " + id);
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repo => repo.id !== id));
    }
    catch (e) {
      console.error(`Error on delete ${e}`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => {
            return (
              <li key={repository.id}>
                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
