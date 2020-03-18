import React, { useReducer, useEffect } from 'react';
import { Transition, Header, Icon, Segment, Progress } from 'semantic-ui-react';
import './notification.css';

const initialState = {
  hide: false,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'show':
      return { ...state, hide: false };
    case 'hide':
      return { ...state, hide: true };
  }
}

export function Notification() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (!state.hide) {
      timerId = setTimeout(() => {
        clearTimeout(timerId);
        dispatch({ type: 'hide' });
      }, 3000);
    }

    return () => clearTimeout(timerId);
  });

  return (
    <div id="notification-wrapper">
      <Transition visible={!state.hide} animation="zoom" duration={500}>
        <Segment inverted color="blue">
          <Header inverted>
            <Icon name="info circle" />
            <Header.Content>
              Information
              <Header.Subheader>This is a default notification</Header.Subheader>
            </Header.Content>
          </Header>
          <Progress attached="bottom" />
        </Segment>
      </Transition>
    </div>
  );
}
