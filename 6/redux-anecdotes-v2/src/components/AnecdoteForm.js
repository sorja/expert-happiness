import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    // this.props.store.dispatch({ 
    //   type: 'CREATE', 
    //   content 
    // })
    this.props.createAnecdote(content)
    this.props.createNotification(`Created: ${JSON.stringify(content)}`)
    setTimeout(() => {
      this.props.deleteNotification()
    }, 5 * 1000)
    e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

const mapDispatchToProps = {
  createAnecdote,
  createNotification,
  deleteNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
