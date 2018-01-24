import React from 'react'
import ReactDOM from 'react-dom'

const randIndex = arr => Math.floor(Math.random()*arr.length)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      best: {score: 0, txt: ''},
      counter: {}
    }
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <br/>
        <button name="vote" onClick={this.vote}>vote</button>
        <button name="next" onClick={ () => {
          this.setState({
            selected: randIndex(this.props.anecdotes)
          })
        }}>next</button>
        {
          this.state.best.txt && <div>
            <h3> Best anecdote </h3>
              <span>{this.state.best.txt}</span><br/>
              <span>{this.state.best.score} score </span>
              
          </div>
        }
      </div>
    )
  }

  vote = () => {
    const txt = this.props.anecdotes[this.state.selected]
    const key = btoa(txt)
    const counter = this.state.counter;
    
    if(!counter[key]) counter[key] = 0
    counter[key] += 1

    const best = counter[key] > this.state.best.score ? {
      txt, score: counter[key]
    } : this.state.best

    this.setState({
      counter,
      best
    })
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)