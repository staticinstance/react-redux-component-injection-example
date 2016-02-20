const examplePlugin = `const styles = {}
styles.theremin = {
    height: 200,
    width: 200,
    fontSize: 10,
    border: '1px solid',
    cursor: 'crosshair',
    margin: 10,
    display: 'inline-block'
}

React.createClass({
  getInitialState(){
    return {
        time: 0
    }
  },
  componentDidMount(){
        this.oscillator = this.props.createOscillator()
    },

    play() {
        this.oscillator.play()
    },

    stop() {
        this.oscillator.stop()
    },

    changeTone(event) {
        const { clientX, clientY } = event
        const { top, right, bottom, left } = event.target.getBoundingClientRect()
        const pitch = (clientX - left) / right
        const volume = 1 - (clientY - top) / bottom
        this.oscillator.setPitchBend(pitch)
        this.oscillator.setVolume(volume)
    },
  componentWillUnmount(){
    this.oscillator.stop()
  },
  makeAjaxCall(){
    this.props.axios
      .get('http://server.cors-api.appspot.com/server?id=6677589&enable=true&status=200&credentials=false')
      .then(function (response) {
          alert("Made an AJAX call status: "+response.status);
      })
      .catch(function (response) {
          console.log(response);
      });
  },
  render() {
      return (
          <div style={{padding: "5px", border: "5px solid white"}}>
            {this.props.plugin.location} plugin id {this.props.id}
            <br/><br/>
            <div
                style={styles.theremin}
                onMouseEnter={this.play}
                onMouseLeave={this.stop}
                onMouseMove={this.changeTone}
            /><br/>
            <br/>
            <button onClick={() => this.makeAjaxCall()}>make ajax call</button>
          </div>
      );
  }
})`;

export default examplePlugin;