import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import anecdoteService from "../services/anecdotes";

import NotificationContext from "../NotificationContext";


const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(anecdoteService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: () => {
      dispatch({ type: "ADD_NOTIFICATION", payload: "Too short of an anecdote, must have length of 5" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION"});
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;


    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content: anecdote, id: getId(), votes: 0 });
    dispatch({ type: "ADD_NOTIFICATION", payload: `anecdote "${anecdote}" created` });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION"});
    }, 5000);
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
