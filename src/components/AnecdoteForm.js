import { useMutation, useQuery, useQueryClient } from "react-query";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(anecdoteService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content: anecdote, id: getId(), votes: 0 });
    console.log('new anecdote');
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
