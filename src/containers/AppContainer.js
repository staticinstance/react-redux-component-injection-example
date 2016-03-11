import App from "../App";
import { connect } from "react-redux";
import { registerPlugin, unregisterPlugin, fetchPlugins, updatePlugin } from "../Actions/actions";
import axios from "axios";
import { MenuItem } from 'react-bootstrap';
const low = require('lowdb')
const storage = require('lowdb/browser')
const db = low('db', { storage })
const Guid = require('guid')

const mapStateToProps = (state) => {
  return {
    pluginStore: state.pluginStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      axios,
      MenuItem,
      onRegisterPlugin: (plugin) => dispatch(registerPlugin(plugin)),
      fetchPlugins: () => {
          db('plugins').value().map((item) => dispatch(registerPlugin(item)))
      },
      saveLocal: (plugin) => {
          if(plugin){

              try{
                  var c = eval(Babel.transform(plugin.src, {presets: ['react', 'es2015']}).code)
              }catch(e){
                  alert("There was a problem parsing your plugin code: \n\n" + e)
                  return;
              }

              var result = db('plugins')
                  .find({ id: plugin.id })
              if(!result) {
                  plugin.id = Guid.raw();
                  dispatch(registerPlugin(plugin));
                  db("plugins").push(plugin)
              }else {
                  var updatedPlugin = db('plugins')
                      .chain()
                      .find({id: plugin.id})
                      .assign({src: plugin.src})
                      .value();
                  dispatch(updatePlugin(plugin));
              }
          }
      }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
