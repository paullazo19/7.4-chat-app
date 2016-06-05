// __tests__/message input-test.js
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../modules/App';
import Chat from '../modules/Chat';
import MessageInput from '../modules/MessageInput';

jest.unmock('../modules/App');
jest.unmock('../modules/Chat');
jest.unmock('../modules/MessageInput');

describe('Message input', ()=> {
  var appRendered;
  beforeEach(()=> {
    appRendered = TestUtils.renderIntoDocument(
      <MessageInput />
    );
  })

  it('renders message input', ()=> {
    var messageInput = TestUtils.findRenderedDOMComponentWithClass(appRendered, "log__message--input");
    // assert it has text
    expect(messageInput).toBeDefined();
  });

  it('handles state change for message input', ()=> {

    expect(appRendered.state.messages).toBeDefined();
  });
});
