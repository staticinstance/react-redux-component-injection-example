import React, { Component } from "react";
import Codemirror from "react-codemirror";
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';

class PluginEditView extends Component {
    render(){
        return (<div style={{margin: "5px"}}>
                <this.props.plugin.cmp key={this.props.plugin.id} {...this.props}/>
                <div>
                    <br/>
                    <Codemirror style={{"height":"300px", "width":"500px"}} value={this.props.code} onChange={(code) => this.props.updateCode(code)} options={{lineNumbers: true, mode: 'javascript'}} />
                    <br/>
                    <button style={{float: "right"}}
                            onClick={ () => { this.setState({edit: false, location: null})} }>
                        close
                    </button>
                    <button
                        style={{float: "right"}}
                        onClick={() => {
                                let plugin = this.props.plugin;
                                plugin.src = this.props.code;
                                this.props.saveLocal(plugin, this)
                                this.setState({edit: false})}}>
                        save
                    </button>
                    <br/><br/>
            </div>
        </div>)
    }
}

module.exports = PluginEditView;
