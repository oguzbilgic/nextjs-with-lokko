import React from 'react';
import Link from 'next/link';
import {createFragment} from '../libs/lokka.js';

const App = ({user, children}) => (
  <div id='layout'>
    <Link href='/'>
      <a>Home</a>
    </Link>

    <Link href='/about'>
      <a>About</a>
    </Link>

    <Link href='/login'>
      <a>{user ? user.email : 'Login'}</a>
    </Link>

    <div id='container'>
      {children}
    </div>

    <style jsx>{`
      a {
        font-family: Arial;
        font-size: 15px;
        font-weight: bold;
        text-decoration: none;
        color: #595959;
        display: inline-block;
        margin: 10px 15px 10px 0;
      }

      #container {
        height: 100%;
      }

      #layout {
        height: 100%;
        margin: auto;
        max-width: 900px;
      }
    `}</style>
  </div>
)

App.fragments= {
  user: createFragment(`
    fragment on User {
      email
    }`
  )
};

export default App;
