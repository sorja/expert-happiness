import React from "react";
import PropTypes from 'prop-types'

import Blog from "./components/Blog";
export default ({ blogs }) => (
  <div>
    <h2>blogs</h2>
    <button onClick={() => window.localStorage.removeItem("loggedblogappUser")}>
      Logout
    </button>
    <p>{this.state.user.name} logged in</p>
    {blogs.sort((a,b) => a.likes - b.likes).map(blog => <Blog key={blog._id} blog={blog} />)}
  </div>
);

Blog.propTypes = {
  blogs: PropTypes.array.isRequired
};