import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import anecdoteService from "./services/anecdotes";

const App = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(anecdoteService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    }
  });

  const handleVote = anecdote => {
    newAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1});
    console.log('vote');
  }

  const result = useQuery("anecdotes", anecdoteService.getAll, { retry: 1 });

  if (result.isError) {
    return (<div>anecdote service not available due to problems in server</div>);
  }
  if (result.isLoading) {
    return (<div>loading data...</div>);
  }

  const anecdotes = result.data;

  

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
