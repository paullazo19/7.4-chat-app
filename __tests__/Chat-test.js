// __tests__/CheckboxWithLabel-test.js
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../modules/App';
import Chat from '../modules/Chat';
import MessageInput from '../modules/MessageInput';

jest.unmock('../modules/App');
jest.unmock('../modules/Chat');

describe('Chat component', ()=> {
  var appRendered;
  beforeEach(()=> {
    appRendered = TestUtils.renderIntoDocument(
      <Chat/>
    );
  })

  it('mocked the message input class', ()=> {
    // Expecting modal to have been mocked
    expect(MessageInput.mock.calls.length).toBe(1);
  });

  it('handles state change for message input', ()=> {
    // call handle submit form function
    appRendered.handleSubmitForm();
    expect(appRendered.state.messages).toBeDefined();
  });

});
