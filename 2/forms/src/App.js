// spaghetti is best served cold
import React from 'react';

import _persons from './services/persons'

import Form from './Form'
import Filter from './Filter'
import Notification from './Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: null,
      newName: '',
      newTel: '',
      query: '',
      notifications: []
    }
  }

  componentWillMount() {
    this.populate()
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.persons[nextState.persons.length - 1].id) {
      this.populate()
    }
  }

  populate = () => {
    _persons.getAll().then(v => {
      this.setState({ persons: v.data })
    })
  }

  onClickSubmit = (e) => {
    e.preventDefault()
    const s = this.state
    if (s.persons.some(p => p.name === this.state.newName)) {
      if (!window.confirm('found, edit?')) { return }
      s.persons.forEach(p => {
        if (p.name === this.state.newName) {
          _persons.update(p.id, {
            name: p.newName,
            number: s.tel
          }).catch(
            err => {

              const _ = +new Date()
              this.setState({
                newName: '',
                newTel: '',
                notifications: [...this.state.notifications, {
                  className: 'error',
                  message: 'Person has been deleted',
                  id: _
                }]
              }, () => {
                setTimeout(() => {
                  this.setState({
                    notifications: this.state.notifications.filter(v => v.id !== _)
                  })
                },
                  5 * 1000)
              })
            }
          )
        }
      })
    } else {
      _persons.create({
        name: s.newName,
        number: s.newTel
      }).then(
        this.populate()
      )
    }

    const _ = +new Date()
    this.setState({
      newName: '',
      newTel: '',
      notifications: [...this.state.notifications, {
        className: 'success',
        message: 'Person added',
        id: _
      }]
    })
    setTimeout(() => {
      this.setState({
        notifications: this.state.notifications.filter(v => v.id !== _)
      })
    },
      5 * 1000)
  }

  render() {
    const s = this.state

    if (!s.persons && !s.query) {
      return <h1> Haetaan dataa palvelimelta, hetki </h1>
    }

    const persons = this.state.persons.filter(e => {
      return Number(this.state.query) ?
        e.number.indexOf(this.state.query) >= 0 :
        e.name && e.name.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0
    })

    const _ = +new Date

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        {
          this.state.notifications.map((v, i) =>
            <Notification key={i} className={v.className} message={v.message} />)
        }
        <Form
          fields={{ newTel: s.newTel, newName: s.newName }}
          onClickSubmit={this.onClickSubmit}
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />

        {/* This probably could be split more, AddressBook.js etc */}
        <h2>Numerot</h2>
        <Filter query={s.query} onChange={e => this.setState({ query: e.target.value })} />
        <table>
          <thead><tr><th>nimi</th><th>numero</th><th /></tr></thead>
          <tbody>
            {
              persons.map((p, i) =>
                <tr key={i}>
                  <td>{p.name}</td>
                  <td style={{ fontAlign: 'right' }}>{p.number}</td>
                  <td> <button onClick={
                    () => {
                      window.confirm('r u shure') &&
                        _persons.del(p.id).then(this.populate) &&
                        this.setState({
                          notifications: [...this.state.notifications, {
                            className: 'error',
                            message: 'Deleted',
                            id: _
                          }]
                        }, () => { setTimeout(() => { this.setState({ notifications: this.state.notifications.filter(v => v.id !== _) }) }, 3 * 1000) })
                    }
                  }> poista </button> </td>
                </tr>)
            }
          </tbody>
        </table>

        {/* {s.newName} */}
      </div>
    )
  }
}

export default App
