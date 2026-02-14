const BASE_URL = "https://rickandmortyapi.com/api/";

const fetchPersonajes = async (
  page = 1,
  name = "",
  status = "",
  species = "",
  id = 0,
) => {
  // llamamos a toda la pagina 1 de los personajes

  let url = `${BASE_URL}character/?page=${page}`;

  if (name) {
    name = name.trim();
    url += `&name=${encodeURIComponent(name)}`;
  }

  if (status) {
    url += `&status=${status}`;
  }

  if (species) {
    url += `&species=${species}`;
  }

  if (id) {
    url += `&id=${id}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error en la peticion");
  }
  const data = await response.json();
  return data;
};

// Episodios
const fetchEpisodios = async (page = 1) => {
  const response = await fetch(`${BASE_URL}episode/?page=${page}`);

  if (!response.ok) {
    throw new Error("Error en la peticion");
  }
  const data = await response.json();
  return data;
};

//Personajes por ids
const fetchPersonajesId = async (page = 1, id = 0) => {
  const response = await fetch(`${BASE_URL}character/?page=${page}&id=${id}`);
  if (!response.ok) {
    throw new Error("Error en la peticion");
  }
  const data = await response.json();
  return data;
};

export { fetchPersonajes, fetchEpisodios };
