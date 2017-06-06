import React from 'react';
import Link from 'next/link';
import {createFragment} from '../libs/lokka.js';

export const fragment = createFragment(`
  fragment on Query {
    user {
      email
    }
  }
`);

export default ({query, children}) => (
  <div id='layout'>
    <li>
      <Link href='/' prefetch>Home</Link>
    </li>

    <li>
      <Link href='/about'>About</Link>
    </li>

    <li>
      <Link href='/login' prefetch>{query.user ? query.user.email : 'Login'}</Link>
    </li>

    <div id='container'>
      {children}
    </div>

    <style jsx>{`
      li {
        color: black;
        display: inline-block;
        margin: 5px;
      }

      #layout {
        margin: auto;
        max-width: 900px;
      }
    `}</style>
  </div>
)
