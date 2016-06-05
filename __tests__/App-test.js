// __tests__/CheckboxWithLabel-test.js
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../modules/App';

jest.unmock('../modules/App');

describe('App component', ()=> {
  var appRendered;
  beforeEach(()=> {
    appRendered = TestUtils.renderIntoDocument(
      <App/>
    );
  })
  it('renders username input', ()=> {
    var userInput = TestUtils.findRenderedDOMComponentWithClass(appRendered, "log__username--input");
    // assert it has text
    expect(userInput).toBeDefined();
  });

});
