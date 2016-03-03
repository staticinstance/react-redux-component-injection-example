jest.dontMock('../src/Components/Plugin');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Plugin = require('../src/Components/Plugin');

class externalPlugin extends Component {
    render() {
        return <div>hey</div>
    }
}

module.exports = Plugin;

describe('Plugin', () => {
    var plugin = {
        cmp: externalPlugin,
        src: '<div>hello</div>',
        location: 'target4',
        id: 1
    };
    var plugin = TestUtils.renderIntoDocument(
      <Plugin plugin={plugin} devMode={false} />
    );
    
  it('has an edit button in dev mode', () => {
    var pluginNode = ReactDOM.findDOMNode(plugin);
       var button = TestUtils.findRenderedDOMComponentWithTag(plugin, 'button');
        expect(button.textContent).toEqual('edit');
  });
});