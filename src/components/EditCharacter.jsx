import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './showCharacters.css'

const url = "http://localhost:8080/characters"

const EditCharacter = () => {
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { characterId } = useParams(); 

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/${characterId}`);
        setCharacter(response.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchCharacter();
  }, [characterId]);

  const handleInputChange = (event) => {
    setCharacter({ ...character, [event.target.name]: event.target.value });
  };

  const goBack = () => {
    navigate("/");
  }

  const handleEditCharacter = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`${url}/${characterId}`, character);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="form">
      <h2>Editar Personaje</h2>
      <form onSubmit={handleEditCharacter}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={character.name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="img">Imagen:</label>
          <input
            type="text"
            id="img"
            name="img"
            value={character.img || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={character.description || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={goBack}>Cancelar</button>
      </form>
      </div>
    </div>
  );
};

export default EditCharacter;