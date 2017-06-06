import React from 'react';
import withQuery from '../libs/withQuery.js';
import App, {fragment} from '../layouts/App.js';

const About = ({ data }) => (
  <App query={data}>
    <h3>About Us</h3>
  </App>
)

const query = `
  query {
    ...${fragment}
  }
`;

export default withQuery(query, About);
