import React, { Component } from "react";
import axios from "axios";
import Codemirror from "react-codemirror";
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import './css/codemirror.css';
import { Plugin, PluginList } from "./Components"
import examplePlugin from "./examplePlugin";
import createOscillator from './utils/createOscillator'

const low = require('lowdb')
const storage = require('lowdb/browser')
const db = low('db', { storage })

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            conversationsTitle: "Conversations",
            messagesTitle: "Messages",
            contactsTitle: "Contacts",
            code: examplePlugin
        };
    }
    updateCode(newCode) {
        this.setState({
            code: newCode
        });
    }
    componentDidMount(){
        const { fetchPlugins } = this.props;
        fetchPlugins();
    }
    closeEditor(){
        this.setState({
            edit: false
        });
    }
    updateState(state){
        this.setState(state);
    }
  render() {
    const { onRegisterPlugin } = this.props;
      const options = {
          lineNumbers: true,
          mode: 'javascript'
      };
    return (
      <div>

          <button onClick={ () => { this.setState({devMode: !this.state.devMode}); if(!this.state.devMode && this.state.edit){this.setState({edit: false})}} }>{this.state.devMode ? "exit " : "enter "} dev mode</button>
          {this.state.devMode ?
              <button onClick={ () => { this.setState({edit: !this.state.edit}) } }>create plugin</button>
              : null
          }
          <br/>
          {this.state.edit && this.state.devMode ?
              <div style={{"float": "left"}}>
                  <br/>
                  <Codemirror style={{"height":"300px", "width":"100%", "float": "left"}} value={this.state.code} onChange={(code) => this.updateCode(code)} options={options} />
                  <div style={{float: "right"}}>
                      <br/>
                      <button onClick={ () => { this.props.saveLocal({src: this.state.code, location:"message"}, this) } }>save message plugin</button>
                      <button onClick={ () => { this.props.saveLocal({src: this.state.code, location:"conversation"}, this) } }>save conversation plugin</button>
                      <button onClick={ () => { this.props.saveLocal({src: this.state.code, location:"contact"}, this) } }>save contact plugin</button>
                  </div>
                  <br/><br/>
              </div>
              : null}
          <br/>
          <div style={{clear: "both"}}>
              <div style={{"padding":"5px","margin":"5px","backgroundColor": "bisque","verticalAlign": "top","float":"left"}}>
                  <h4>{this.state.conversationsTitle}</h4>
                  <PluginList createOscillator={createOscillator} topLevelScope={this} devMode={this.state.devMode} location="conversation" {...this.props} />
              </div>
              <div style={{"padding":"5px","margin":"5px","backgroundColor": "salmon","verticalAlign": "top","float":"left"}}>
                  <h4>{this.state.contactsTitle}</h4>
                  <PluginList createOscillator={createOscillator} topLevelScope={this} devMode={this.state.devMode} location="contact" {...this.props} />
              </div>
              <div style={{"padding":"5px","margin":"5px","backgroundColor": "lightblue","verticalAlign": "top","float":"left"}}>
                  <h4>{this.state.messagesTitle}</h4>
                  <PluginList createOscillator={createOscillator} topLevelScope={this} devMode={this.state.devMode} location="message" {...this.props} />
              </div>
          </div>

          </div>
    )
  }
}

export default App
