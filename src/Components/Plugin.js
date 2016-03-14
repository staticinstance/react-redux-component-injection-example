import React, { Component } from "react";
import PluginEditView from "../Components/PluginEditView";

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
    onEditButtonClick(){
        this.setState({
            edit: !this.state.edit
        });
    }
    closeEditor(){
        this.setState({
            edit: false
        });
    }
    getDisplayView(){
        return <this.props.plugin.cmp key={ this.props.plugin.id } { ...this.props }/>
    }
    getDevModeView(){
        return <span>
                    <this.props.plugin.cmp key={ this.props.plugin.id } { ...this.props }/>
                        {this.props.devMode ?
                            !this.state.edit ?
                                <div>
                                    <br/>
                                    <button 
                                        style={{float: "right"}}
                                        onClick={() => this.onEditButtonClick() }>
                                        edit
                                    </button>
                                    <br/><br/>
                                </div> : null
                            : null
                        }
                </span>
    }
    getView(){
        if(this.props.devMode && this.state.edit){
            return <PluginEditView 
                onCloseEditor={ () => this.closeEditor() } 
                onSaveLocal={ (item) => this.props.saveLocal(item) } 
                { ...this.props } />;
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

module.exports = Plugin;
