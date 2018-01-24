import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Buttons from './Buttons'
import Statistics from './Statistics'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      statistics: {
        good: 0,
        neutral: 0,
        bad: 0,
        total: 0,
      }
    };
  }

  render() {
    return (
      <div>
        <Buttons onClick={this._onClick}/>
        {
          this.state.statistics.total > 0 ? <Statistics statistics={this.state.statistics} /> : <span> Nothing to show :( </span>
        }
      </div>
    )
  }

  _onClick = e => {
    const name = e.target.name
    const statistics = this.state.statistics
    statistics[name] += 1
    statistics['total'] += 1
    this.setState(statistics)
  }

} 

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

