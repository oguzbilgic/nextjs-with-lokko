import React from 'react';
import withQuery from '../libs/withQuery.js';
import {createFragment} from '../libs/lokka.js';
import App from '../layouts/App.js';

const About = ({ query }) => (
  <App user={query.user}>
    <h3>About Us</h3>
  </App>
)

About.fragments = {
  query: createFragment(`
    fragment on Query {
      user {
        ...${App.fragments.user}
      }
    }
  `)
}

export default withQuery(About);
