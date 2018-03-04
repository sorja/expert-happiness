import React from "react";
import Blogs from "./Blogs";
import Login from "./Login";
import blogService from "./services/blogs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <Blogs blogs={this.state.blogs} />
        ) : (
          <Login
            authChange={user =>{
              this.setState({
                user
              }); blogService.setToken(user.token)}
            }
          />
        )}
      </div>
    );
  }
}

export default App;
