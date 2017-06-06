import React from 'react';
import {createFragment} from '../libs/lokka.js';
import App from '../layouts/App.js';
import withQuery from '../libs/withQuery.js';
import { signinUser, signoutUser } from '../mutations/user.js';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'fisyonet@gmail.com', password: '123456789' };
  }

  async handleLogin(e) {
    e.preventDefault();
    const {email, password} = this.state;
    await signinUser(email, password);
    this.props.refetch();
  }

  async handleLogout(e) {
    e.preventDefault();
    await signoutUser();
    this.props.refetch();
  }

  render() {
    return (
      <App user={this.props.query.user}>
        {this.props.query.user &&
          <div>
            <h3>Account</h3>
            <p> {this.props.query.user.email} </p>

            <h3>School</h3>
            <p> {this.props.query.user.tenant.name} </p>


            <button onClick={this.handleLogout.bind(this)}>Log out</button>
          </div>
        }

        {!this.props.query.user &&
          <div>
            <h3>Login</h3>
            <form onSubmit={this.handleLogin.bind(this)}>
              <input
                type='text'
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder='email'
              />
              <input
                type='password'
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder='password'
              />
              <button type='submit'>Login</button>
            </form>
          </div>
        }

        <style jsx>{`
          h3, p {
            font-family: Arial;
          }


          input {
            font-size: 14px;
            width: 300px;
            display: block;
            border: 1px solid #d0d0d0;
            border-radius: 3px;
            margin-bottom: 13px;
            padding: 8px;
          }

          button {
            font-size: 14px;
            display: block;
            border: 1px solid #d0d0d0;
            border-radius: 3px;
            margin-bottom: 13px;
            padding: 8px;
            background: white;
          }
        `}</style>
      </App>
    )
  }
}

Index.fragments = {
  query: createFragment (`
    fragment on Query {
      user {
        id
        email
        tenant {
          name
        }
        ...${App.fragments.user}
      }
    }`
  )
}

export default withQuery(Index);
