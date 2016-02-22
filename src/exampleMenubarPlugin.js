const exampleMenubarPlugin = `export default class examplePlugin extends React.Component {
  render() {
    return (
      <this.props.MenuItem onClick={ () => alert("hello") }>
        Injected MenuItem
      </this.props.MenuItem>
    )
  }
}`;

export default exampleMenubarPlugin;
