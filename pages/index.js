import React from 'react';
import App from '../layouts/App.js';
import withQuery from '../libs/withQuery.js';
import {createFragment} from '../libs/lokka.js';
import { createClassroom } from '../mutations/classroom.js';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {name} = this.state;
    const tenantId = this.props.query.user.tenant.id;
    await createClassroom(tenantId, name);
    this.props.refetch();
  }

  handleClassroomSelect(id) {
    this.props.updateVars({ classroomId: id });
  }

  render() {
    return (
      <App user={this.props.query.user}>
        {!this.props.query.user &&
          <div>
            You need to login bro
          </div>
        }

        {this.props.query.user &&
          <div>
            <h3>{this.props.query.user.tenant.name}</h3>
            <h3>Classrooms</h3>
            <ul>
              {this.props.query.user.tenant.classrooms.map(classroom =>
                <li>
                  <a href='#' onClick={() => this.handleClassroomSelect(classroom.id)}>{classroom.name}</a> - {classroom._guardiansMeta.count} guardians - <a>delete</a>
                </li>
              )}
            </ul>

            {this.props.query.Classroom &&
              <div>
                <h3>Guardians of {this.props.query.Classroom.name}</h3>
                <ul>
                  {this.props.query.Classroom.guardians.map(guardian =>
                    <li>
                      {guardian.id} - {guardian.phone}
                    </li>
                  )}
                </ul>
              </div>
            }

            <h3>Create Classroom</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input
                type='text'
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder='Classroom'/>
              <button type='submit'>Create</button>
            </form>
          </div>
        }

        <style jsx>{`
          h3, p, li {
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
  query: createFragment(`
    fragment on Query {
      user {
        tenant {
          id
          name
          classrooms {
            id
            name
            _guardiansMeta {
              count
            }
          }
        }
        ...${App.fragments.user}
      }
    }
    `)
  }

export default withQuery(Index, { classroomId: '' });
