import React, { Component } from "react";
import Codemirror from "react-codemirror";
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';

class PluginEditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.plugin.src
        }
    }
    updateCode(newCode) {
        this.setState({
            code: newCode
        });
    }
    render(){
        return (<div style={{margin: "5px"}}>
                <this.props.plugin.cmp key={this.props.plugin.id} {...this.props}/>
                <div>
                    <br/>
                    <Codemirror style={{"height":"300px", "width":"500px"}} value={this.state.code} onChange={(code) => this.updateCode(code)} options={{lineNumbers: true, mode: 'javascript'}} />
                    <br/>
                    <button style={{float: "right"}}
                            onClick={ () => { this.props.onCloseEditor() }}>
                        close
                    </button>
                    <button
                        style={{float: "right"}}
                        onClick={() => {
                                let plugin = this.props.plugin;
                                plugin.src = this.state.code;
                                this.props.onSaveLocal(plugin);
                                this.props.onCloseEditor()}}>
                        save
                    </button>
                    <br/><br/>
            </div>
        </div>)
    }
}

module.exports = PluginEditView;
