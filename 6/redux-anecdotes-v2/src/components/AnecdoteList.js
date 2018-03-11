import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { createNotification, deleteNotification } from '../reducers/notificationReducer';

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.map(anecdote =>
          (<div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.voteAnecdote(anecdote);
                this.props.createNotification(`Voted: ${anecdote.content}`);
                setTimeout(() => {
                  this.props.deleteNotification();
                }, 5 * 1000);
}
              }
              >
                vote
              </button>
            </div>
          </div>))}
      </div>
    );
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  createNotification,
  deleteNotification
}

const mapStateToProps = state => ({
  anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes)
})

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
