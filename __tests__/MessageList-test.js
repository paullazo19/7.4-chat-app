// __tests__ message list
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MessageList from '../modules/MessageList';

describe('Message list', ()=> {
  var appRendered;

  beforeEach(()=> {
    appRendered = TestUtils.renderIntoDocument(
      <MessageList />
    );
  })

  it('renders static list item', ()=> {
    var messageList = TestUtils.scryRenderedDOMComponentsWithClass(appRendered, "log__message--static");
    // assert it has text
    expect(messageList).toBeDefined();
  });
});
