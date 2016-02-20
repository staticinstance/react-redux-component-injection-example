import { Component } from "react";
import Codemirror from "react-codemirror";
import axios from "axios";
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import '../css/codemirror.css';
import { MenuItem } from 'react-bootstrap';

class Plugin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            code: this.props.plugin.src
        }
    }
    componentWillReceiveProps(){
        if(!this.props.devMode){
            this.setState({edit: false})
        }
    }
    updateCode(newCode) {
        this.setState({
            code: newCode
        });
    }
    closeEditor(){
        this.setState({
            edit: false
        });
    }
    getEditView(){
        return (<div style={{margin: "5px"}}>
            <this.props.plugin.cmp axios={axios} MenuItem={MenuItem} key={this.props.id} {...this.props}/>
            {this.state.edit && this.props.devMode ? <div>
                <br/>
                <Codemirror style={{"height":"300px", "width":"500px"}} value={this.state.code} onChange={(code) => this.updateCode(code)} options={{lineNumbers: true, mode: 'javascript'}} />
                <br/>
                <button
                    style={{float: "right"}}
                    onClick={() => {
                             let plugin = this.props.plugin;
                             plugin.src = this.state.code;
                             this.props.saveLocal(plugin, this)}}>
                    save
                </button>
                <br/><br/>
            </div>
                : null}
        </div>)
    }
    getDisplayView(){
        return <this.props.plugin.cmp axios={axios} MenuItem={MenuItem} key={this.props.id} {...this.props}/>
    }

    getDevModeView(){
        return <span><this.props.plugin.cmp axios={axios} MenuItem={MenuItem} key={this.props.id} {...this.props}/>
            {this.props.devMode ?
                !this.state.edit ?
                    <div><br/>
                        <button style={{float: "right"}} onClick={() => this.setState({edit: !this.state.edit}) }>edit</button>
                        <br/><br/>
                    </div> : null
                : null
            }
            </span>
    }

    getView(){
        if(this.state.edit && this.props.devMode){
            return this.getEditView();
        }else if(this.props.devMode) {
            return this.getDevModeView();
        }else{
            return this.getDisplayView();
        }
    }
    render() {
        return this.getView()
    }
}

export default Plugin;
