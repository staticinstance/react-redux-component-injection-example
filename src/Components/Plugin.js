import React, { Component } from "react";
import PluginEditView from "../Components/PluginEditView";
import PluginDevView from "../Components/PluginDevView";

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
    editButtonClick(){
        this.setState({
            edit: !this.state.edit
        });
    }
    closeEditor(){
        this.setState({
            edit: false
        });
    }
    getView(){
        if(this.props.devMode && this.state.edit){
            return <PluginEditView 
                onCloseEditor={ () => this.closeEditor() } 
                onSaveLocal={ (item) => this.props.saveLocal(item) } 
                { ...this.props } />;
        }else if(this.props.devMode) {
            return <PluginDevView 
                onEditButtonClick={ () => this.editButtonClick() } 
                { ...this.props } />;
        }else{
            return <this.props.plugin.cmp key={ this.props.plugin.id } { ...this.props }/>
        }
    }
    render() {
        return this.getView()
    }
}

module.exports = Plugin;
