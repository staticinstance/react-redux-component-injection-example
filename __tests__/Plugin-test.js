import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';

jest.dontMock('../src/Components/Plugin');
import Plugin from '../src/Components/Plugin';

class externalPlugin extends Component {
    render() {
        return <div>hey</div>
    }
}

describe('Plugin', () => {
    var pluginRecord = {
        cmp: externalPlugin,
        src: '<div>hello</div>',
        location: 'target4',
        id: 1
    };
    
    var devwrapper = shallow(
      <Plugin plugin={pluginRecord} devMode={true} />
    );
    
    var wrapper = shallow(
      <Plugin plugin={pluginRecord} devMode={false} />
    );
    
//   it('has an edit button in dev mode', () => {
//     var pluginNode = ReactDOM.findDOMNode(plugin);
//        var button = TestUtils.findRenderedDOMComponentWithTag(plugin, 'button');
//         expect(button.textContent).toEqual('edit');
//   });
  
  it('does not have an edit button in non devMode', () => {
      expect(wrapper.find('button').contains('edit')).toBe(false);
  });
  
  it('has an edit button in devMode', () => {
      expect(devwrapper.find('button').contains('edit')).toBe(true);
  });
});