import React from 'react';
import axios from 'axios'

import Form from './Form'
import Filter from './Filter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: null,
      newName: '',
      newTel: '',
      query: ''
    }
  }

  componentWillMount() {
    axios.get('http://localhost:3001/persons').then(v => {
      this.setState({ persons: v.data })
    })
  }

  onClickSubmit = (e) => {
    e.preventDefault()
    const s = this.state

    if (s.persons.some(p => p.name === this.state.newName)) {
      alert()
      return
    }

    const newPerson = {
      name: s.newName,
      number: s.newTel
    }

    this.setState({
      persons: [...s.persons, newPerson],
      newName: '',
      newTel: ''
    })
  }

  render() {
    const s = this.state

    if (!s.persons && !s.query) {
      return <h1> Haetaan dataa palvelimelta, hetki </h1>
    }

    const persons = this.state.persons.filter(e => {
      return Number(this.state.query) ? e.number.indexOf(this.state.query) >= 0 : e.name.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0
    })

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Form
          fields={{ newTel: s.newTel, newName: s.newName }}
          onClickSubmit={this.onClickSubmit}
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />

        {/* This probably could be split more, AddressBook.js etc */}
        <h2>Numerot</h2>
        <Filter query={s.query} onChange={e => this.setState({ query: e.target.value })} />
        <ul>
          {
            persons.map((p, i) => <li key={i}>{p.name} <span style={{ marginLeft: '2em', fontAlign: 'right' }}>{p.number}</span> </li>)
          }
        </ul>

        {/* {s.newName} */}
      </div>
    )
  }
}

export default App