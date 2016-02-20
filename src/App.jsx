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
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';


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

    renderDropdownButton(title, i) {
        console.log('hey')
        return (
            <DropdownButton bsStyle={title.toLowerCase()} title={title} key={i} id={`dropdown-basic-${i}`}>
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3" active>Active Item</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">Separated link</MenuItem>
                {this.props.pluginStore.filter((item) => item.location === "menubar").map((item) => {
                    const plugin = item;
                    return <Plugin MenuItem={MenuItem} devMode={this.state.devMode} location="menubar" plugin={item} {...this.props} />
                })}
            </DropdownButton>
        );
    }


  render() {
    const { onRegisterPlugin } = this.props;
      const options = {
          lineNumbers: true,
          mode: 'javascript'
      };

      const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger', 'Link'];

      const buttonsInstance = (
          <ButtonToolbar>{BUTTONS.map((title) => this.renderDropdownButton(title))}</ButtonToolbar>
      );
console.log(buttonsInstance)
    return (
      <div>
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
                      <button onClick={ () => { this.props.saveLocal({src: this.state.code, location:"menubar"}, this) } }>save menubar plugin</button>
                  </div>
                  <br/><br/>
              </div>
              : null}
          </div>
          <br/><br/>
          <div style={{clear: "both"}}>
              <br/><br/>
              {buttonsInstance}
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
      </div>
    )
  }
}

export default App
