import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Plugin from '../src/Components/Plugin';

jest.dontMock('../src/Components/Plugin');


class externalPlugin extends Component {
    render() {
        return <div>hey</div>
    }
}

describe('Plugin', () => {
    var pluginRecord = {
        cmp: externalPlugin,
        src: externalPlugin,
        location: 'target4',
        id: 1
    };

    var devwrapper = shallow(
        <Plugin plugin={pluginRecord} devMode={true} />
    );

    var wrapper = shallow(
        <Plugin plugin={pluginRecord} devMode={false} />
    );
    
  
    it('does not have an edit button in non devMode', () => {
        expect(false).toBe(false);
    });

    it('has an edit button in devMode', () => {
        expect(devwrapper.find('button').contains('edit')).toBe(true);
    });
});