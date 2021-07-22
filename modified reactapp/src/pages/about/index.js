import React from 'react';
import { Link } from "react-router-dom";

import './style.css';

class About extends React.Component {
  render() {
    return(
      <section class="about">
        <h1>About</h1>
        <p>Hey out there, I'm Paul from javascriptcoding. I'm 17 years old and I love to code!</p>
        <Link to="/home">Home >></Link>
      </section>
    );
  }
}

export default About;
