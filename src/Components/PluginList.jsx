import { Component } from "react";
import { Plugin } from "../Components"

class PluginList extends Component {
    render(){
        const { pluginStore } = this.props;
        return <div>
            {pluginStore.filter((item) => item.location === this.props.location).map((item) => {
                const plugin = item;
                return <Plugin key={item.id} id={item.id} plugin={item} {...this.props} />;
            })}
        </div>
    }
}

export default PluginList;
