import {query} from './lokka.js'

export default (Komponent, vars = {}) => {
  const kuery = `
    query {
      ...${Komponent.fragments.query}
    }
  `;

  return class WithQuery extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.requestData();
    }

    requestData() {
      query(kuery, vars).then(data => this.setState({ data }) )
    }

    refetch() {
      this.requestData();
    }

    updateVars(vars) {
      query(kuery, vars).then(data => this.setState({ data }) )
    }

    render() {
      if (this.state.data) {
        return <Komponent
          url={this.props.url}
          refetch={this.refetch.bind(this)}
          updateVars={this.updateVars.bind(this)}
          query={this.state.data}/>
      }

      return null;
    }
  }
}
