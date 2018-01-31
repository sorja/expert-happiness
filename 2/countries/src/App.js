import React, { Component } from 'react';
import axios from 'axios'

/* 
  This should be probably split in several parts
*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: {},
      query: '',
      fetchedCountries: [],
      selectedCountry: ''
    }
  }

  componentWillMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then(v => {
      this.setState({ fetchedCountries: v.data },
        () => {
          /* Index them by name */
          const tmp = {}
          this.state.fetchedCountries.forEach(e => {
            tmp[e.name.toLowerCase()] = e
          })
          this.setState({
            countries: tmp
          })
        })
    })
  }

  render() {
    if (this.state.selectedCountry){
      return <Country country={ this.state.countries[this.state.selectedCountry] }/>
    }

    const countries = Object.keys(this.state.countries).filter(e => {
      return e.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0
    })

    let content = <p> Type more </p>
    if (countries.length === 1) {
      const c = countries[0]
      const country = this.state.countries[c]
      content = <Country country={country} />
    } else if (countries.length < 10) {
      content = countries.map(
        (e, i) => <p name={e} onClick={ e => {this.setState({selectedCountry: e.target.innerHTML})}} key={i}>{e}</p>
      )
    }

    return (
      <div className="App">
        <label htmlFor="query"> find countries: </label>
        <input id="query" type="text" value={this.state.query} onChange={e => this.setState({ query: e.target.value })} />

        <div>
          {content}
        </div>

      </div>
    );
  }
}

export default App;

const Country = ({ country }) => <div>
  <h1>{country.name}</h1>
  <p>{`capital: ${country.capital}`}</p>
  <p>{`population: ${country.population}`}</p>
  <img width="200" src={country.flag} alt={country.name} />
</div>