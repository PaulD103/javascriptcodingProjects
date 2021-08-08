import React from 'react';
import { Link } from "react-router-dom";

import "./style.css"

class Home extends React.Component {
  render() {
    return(
      <section class="home">
        <h1>Home</h1>
        <h2>javascriptcoding</h2>
        <Link to="/about">About >></Link>
      </section>
    );
  }
}

export default Home;
