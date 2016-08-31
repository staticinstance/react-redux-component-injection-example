import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme())

import Plugin from '../src/Components/Plugin';
import PluginEditView from '../src/Components/PluginEditView';
import PluginDevView from '../src/Components/PluginDevView';


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

    const onButtonClick = sinon.spy();
        
    var devwrapper = shallow(
        <PluginDevView plugin={pluginRecord} onEditButtonClick={onButtonClick} />
    );
    
    var editwrapper = shallow(
        <PluginEditView plugin={pluginRecord} devMode={true} edit={true} />
    );

    var wrapper = shallow(
        <Plugin plugin={pluginRecord} devMode={false} />
    );
 
    it('does not have an edit button in non devMode', () => {
        expect(wrapper.find('button').contains('edit')).to.equal(false);
    });

    it('has an edit button in devMode', () => {
        expect(devwrapper.find('button').contains('edit')).to.equal(true);
    });
    
    it('has a save button after clicking the edit button', () => {
       expect(editwrapper.find('button').contains('save')).to.equal(true);
    })
     
    it('simulates click events', () => {
        devwrapper.find('button').simulate('click');
        expect(onButtonClick.called).to.equal(true);
    });

});