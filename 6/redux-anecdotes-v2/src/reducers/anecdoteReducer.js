const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const initialState = anecdotesAtStart.map(asObject);

const reducer = (store = initialState, action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id);
    const voted = store.find(a => a.id === action.id);

    return [...old, { ...voted, votes: voted.votes + 1 }];
  }
  if (action.type === 'CREATE') {
    return [...store, { content: action.content, id: getId(), votes: 0 }];
  }

  return store;
};

export const createAnecdote = content => ({
  type: 'CREATE',
  content,
});
export const voteAnecdote = ({ id }) => ({
  type: 'VOTE',
  id,
});

export default reducer;
