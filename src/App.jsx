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
const low = require('lowdb')
const storage = require('lowdb/browser')
const db = low('db', {storage})
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devMode: false,
            edit: false,
            target1Header: "Target 1",
            target2Header: "Target 2",
            target3Header: "Target 3",
            target4Header: "Target 4",
            code: ""
        };
    }

    updateCode(newCode) {
        this.setState({
            code: newCode
        });
    }

    componentDidMount() {
        const { fetchPlugins } = this.props;
        fetchPlugins();
    }

    closeEditor() {
        this.setState({
            edit: false
        });
    }

    updateState(state) {
        this.setState(state);
    }

    renderDropdownButton(title, i) {
        return (
            <DropdownButton
                bsStyle={title.toLowerCase()}
                title={title}
                key={i}
                id={`dropdown-basic-${i}`}>
                {this.props.pluginStore.filter((item) => item.location === "target4").map((item) => {
                    const plugin = item;
                    return <Plugin MenuItem={MenuItem}
                                   devMode={this.state.devMode}
                                   location="target4"
                                   plugin={item} {...this.props} />
                })}
            </DropdownButton>
        );
    }

    renderCreatePluginButton(location, i) {
        const LOCATIONS = ['target1', 'target2', 'target3', 'target4'];

        return (
            <DropdownButton
                title="Create Plugin">
                {LOCATIONS.map((location) => {
                    return (<MenuItem
                        onClick={ () => { this.setState({
                            edit: true,
                            location: location,
                            code: location === "target4" ? exampleMenubarPlugin : examplePlugin}) } }>
                        create {location} plugin
                    </MenuItem>)
                })}
            </DropdownButton>
        );
    }

    toggleDevMode(){
        this.setState({devMode: !this.state.devMode});
        if(!this.state.devMode && this.state.edit){
            this.setState({edit: false})
        }
    }

    renderEditor(){
        const options = {
            lineNumbers: true,
            mode: 'javascript'
        };

        return (
            <div style={{
                float: "left",
                marginTop: "10px"}}>
                <Codemirror style={{
                    height:"300px",
                    width:"100%",
                    float: "left"}}
                            value={this.state.code}
                            onChange={(code) => this.updateCode(code)}
                            options={options}/>
                <div style={{
                    float: "right",
                    marginTop: "10px"}}>
                    <button style={{
                    marginRight: "10px"}}
                     onClick={ () => {
                        this.setState({edit: false, location: null})}
                        }>close
                    </button>
                    <button
                      onClick={ () => {
                        this.props.saveLocal({
                            src: this.state.code,
                            location: this.state.location},
                            this);
                        this.setState({edit: false, location: null}) }}>save
                    </button>
                </div>
            </div>)
    }

    render() {
        const { onRegisterPlugin } = this.props;

        const BUTTONS = [this.state.target4Header];

        const buttonsInstance = BUTTONS.map((title) => this.renderDropdownButton(title));

        const createButtonsInstance = this.renderCreatePluginButton();
        console.log("PLUGIN_STORE", this.props.pluginStore);

        return (
            <div>
                <div>
                    <button onClick={ () => this.toggleDevMode() }>
                        {this.state.devMode ? "exit " : "enter "} dev mode
                    </button>
                    <ButtonToolbar style={{marginTop: "10px"}}>
                        {buttonsInstance}{this.state.devMode ? createButtonsInstance : null}
                    </ButtonToolbar>
                    {this.state.edit && this.state.devMode ? this.renderEditor() : null}
                </div>
                <div style={{
                    clear: "both",
                    marginTop: "5px"}}>
                    <div style={{
                            padding:"5px",
                            margin:"5px",
                            backgroundColor:"lightblue",
                            verticalAlign:"top",
                            float:"left"}}>
                        You have {this.props.pluginStore.length} plugin{this.props.pluginStore.length === 1 ? "" : "s"}.
                        <ul>
                            {this.props.pluginStore.map( (plugin) => <li>{plugin.location}</li> )}
                        </ul>
                    </div>
                    <div
                        style={{
                            padding:"5px",
                            margin:"5px",
                            backgroundColor:"bisque",
                            verticalAlign:"top",
                            float:"left"
                            }}>
                        <h4>{this.state.target1Header}</h4>
                        <PluginList devMode={this.state.devMode} location="target1" {...this.props} />
                    </div>
                    <div
                        style={{
                            padding:"5px",
                            margin:"5px",
                            backgroundColor:"salmon",
                            verticalAlign:"top",
                            float:"left"}}>
                        <h4>{this.state.target2Header}</h4>
                        <PluginList devMode={this.state.devMode} location="target2" {...this.props} />
                    </div>
                    <div
                        style={{
                            padding:"5px",
                            margin:"5px",
                            backgroundColor:"lightblue",
                            verticalAlign:"top",
                            float:"left"}}>
                        <h4>{this.state.target3Header}</h4>
                        <PluginList devMode={this.state.devMode} location="target3" {...this.props} />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
