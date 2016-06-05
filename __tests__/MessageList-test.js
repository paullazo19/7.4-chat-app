// __tests__/CheckboxWithLabel-test.js
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../modules/App';
import Chat from '../modules/Chat';
import MessageList from '../modules/MessageList';

jest.unmock('../modules/App');
jest.unmock('../modules/Chat');
jest.unmock('../modules/MessageList');

describe('Message list', ()=> {
  var appRendered;
  beforeEach(()=> {
    appRendered = TestUtils.renderIntoDocument(
      <MessageList />
    );
  })

  it('renders message all items in list', ()=> {
    var messageListItems = TestUtils.scryRenderedDOMComponentsWithClass(appRendered, "log__message");
    // assert it has text
    expect(messageListItems.length).toBe(messages.length);
  });
});
