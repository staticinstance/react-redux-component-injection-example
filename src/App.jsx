import React, { Component } from "react";
import axios from "axios";
import Codemirror from "react-codemirror";
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import './css/codemirror.css';
import { Plugin, PluginList } from "./Components"
import examplePlugin from "./examplePlugin";
import exampleMenubarPlugin from "./exampleMenubarPlugin";
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
            code: ""
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
        return (
            <DropdownButton bsStyle={title.toLowerCase()} title={title} key={i} id={`dropdown-basic-${i}`}>
                {this.props.pluginStore.filter((item) => item.location === "menubar").map((item) => {
                    const plugin = item;
                    return <Plugin MenuItem={MenuItem} devMode={this.state.devMode} location="menubar" plugin={item} {...this.props} />
                })}
            </DropdownButton>
        );
    }

    renderCreatePluginButton(location, i){
        const LOCATIONS = ['conversations', 'contacts', 'messages', 'menubar'];

        return (
            <DropdownButton title="Create Plugin">
                {LOCATIONS.map((location) => {
                    return (<MenuItem onClick={ () => { this.setState({edit: true, location: location, code: location === "menubar" ? exampleMenubarPlugin : examplePlugin}) } }>
                    create {location} plugin
                    </MenuItem>)
                })}
            </DropdownButton>
        );
    }
  render() {
      console.log(exampleMenubarPlugin)
    const { onRegisterPlugin } = this.props;
      const options = {
          lineNumbers: true,
          mode: 'javascript'
      };

      const BUTTONS = ['Injected MenuItems'];

      const buttonsInstance = (
          <ButtonToolbar>{BUTTONS.map((title) => this.renderDropdownButton(title))}</ButtonToolbar>
      );

      const createButtonsInstance = (
          <ButtonToolbar>{this.renderCreatePluginButton()}</ButtonToolbar>
      );

      return (
      <div>
        <div>
          <button onClick={ () => { this.setState({devMode: !this.state.devMode}); if(!this.state.devMode && this.state.edit){this.setState({edit: false})}} }>{this.state.devMode ? "exit " : "enter "} dev mode</button>
            {buttonsInstance}
          {this.state.devMode ? createButtonsInstance : null}
          <br/>

          {this.state.edit && this.state.devMode ?
              <div style={{"float": "left"}}>
                  <br/>
                  <Codemirror style={{"height":"300px", "width":"100%", "float": "left"}} value={this.state.code} onChange={(code) => this.updateCode(code)} options={options} />
                  <div style={{float: "right"}}>
                      <br/>
                      <button onClick={ () => { this.props.saveLocal({src: this.state.code, location: this.state.location}, this); this.setState({location: null})} }>save</button>
                      <button onClick={ () => { this.setState({edit: false, location: null})} }>close</button>
                  </div>
                  <br/><br/>
              </div>
              : null}
          </div>
          <div style={{clear: "both"}}>
              <br/><br/>
              <div style={{clear: "both"}}>
                  <div style={{"padding":"5px","margin":"5px","backgroundColor": "bisque","verticalAlign": "top","float":"left"}}>
                      <h4>{this.state.conversationsTitle}</h4>
                      <PluginList createOscillator={createOscillator} topLevelScope={this} devMode={this.state.devMode} location="conversations" {...this.props} />
                  </div>
                  <div style={{"padding":"5px","margin":"5px","backgroundColor": "salmon","verticalAlign": "top","float":"left"}}>
                      <h4>{this.state.contactsTitle}</h4>
                      <PluginList createOscillator={createOscillator} topLevelScope={this} devMode={this.state.devMode} location="contacts" {...this.props} />
                  </div>
                  <div style={{"padding":"5px","margin":"5px","backgroundColor": "lightblue","verticalAlign": "top","float":"left"}}>
                      <h4>{this.state.messagesTitle}</h4>
                      <PluginList createOscillator={createOscillator} topLevelScope={this} devMode={this.state.devMode} location="messages" {...this.props} />
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

export default App
