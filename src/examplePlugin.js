const examplePlugin = `export default class exampleMenubarPlugin extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 0
    }
  }
  makeAjaxCall(){
    this.props.axios
      .get('http://server.cors-api.appspot.com/server?id=6677589&enable=true&status=200&credentials=false')
      .then(function (response) {
          alert("Made an AJAX call status: "+response.status);
      })
      .catch(function (response) {
          console.log(response);
      });
  }
  render() {
      return (
          <div style={{padding: "5px", border: "5px solid white"}}>
            {this.props.plugin.location} plugin id {this.props.plugin.id}
            <br/>
            <button onClick={() => this.makeAjaxCall()}>make ajax call</button>
          </div>
      );
  }
}`;

export default examplePlugin;
