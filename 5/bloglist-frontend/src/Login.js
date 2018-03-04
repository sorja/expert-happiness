import React from "react";
import loginService from "./services/login";

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  login = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      window.localStorage.setItem("loggedblogappUser", JSON.stringify(user));
      this.setState({ username: "", password: "", user });
    } catch (exception) {
      this.setState({
        error: "käyttäjätunnus tai salasana virheellinen"
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  render() {
    return (
      <div>
      <h2>Kirjaudu</h2>
  
      <form onSubmit={this.login}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
    );
  }
}
