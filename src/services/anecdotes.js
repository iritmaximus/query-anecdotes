import axios from "axios";


const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log("Response:", response);
  return response.data;
}

const create = async anecdote => {
  const response = await axios.post(baseUrl, anecdote);
  console.log("Response:", response);
  return response.data;
}

const update = async anecdote => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  console.log("Response:", response);
  return response.data;
}

export default { getAll, create, update };
