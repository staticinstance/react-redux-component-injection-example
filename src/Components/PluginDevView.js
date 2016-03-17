import React, { Component } from "react";

class PluginDevView extends Component {
    render(){
        return <span>
                    <this.props.plugin.cmp key={ this.props.plugin.id } { ...this.props }/>
                    <br/>
                    <button 
                        style={{float: "right"}}
                        onClick={ () => this.props.onEditButtonClick() }>
                        edit
                    </button>
                </span>
    }
}

module.exports = PluginDevView;