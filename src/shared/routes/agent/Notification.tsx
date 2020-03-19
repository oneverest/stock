import React, { useEffect, useState } from 'react';
import { Transition, Header, Icon, Segment, Progress } from 'semantic-ui-react';
import './notification.css';
import { connect } from 'react-redux';
import { hideNotification } from 'store/agent/actions';

function NProgress(props: any) {
  const [percent, setPercent] = useState(0);
  const step = 100 / 30;

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (percent == 100) {
      setTimeout(() => props.notify(), 1000);
    } else {
      timerId = setTimeout(() => setPercent(percent + step < 100 ? percent + step : 100), 1000 / 30);
    }
    return () => clearInterval(timerId);
  });

  return <Progress percent={percent} attached={props.attached} />;
}

function Notification(props: any) {
  const { level, message, visible } = props;

  const InfoIcon = ({ level }: { level: string }) => {
    switch (level) {
      case 'success':
        return <Icon name="check circle" />;
      default:
        return <Icon name="remove circle" />;
    }
  };

  const getColor = (level: string) => {
    return level == 'success' ? 'teal' : 'red';
  };

  return (
    <div id="notification-wrapper">
      <Transition visible={visible} animation="zoom" duration={500}>
        <Segment inverted color={getColor(level)}>
          <Header inverted>
            <InfoIcon level={level} />
            <Header.Content>
              <Header.Subheader>{message}</Header.Subheader>
            </Header.Content>
          </Header>
          {visible && (
            <NProgress
              notify={() => {
                props.dispatch(hideNotification());
              }}
              attached="bottom"
            />
          )}
        </Segment>
      </Transition>
    </div>
  );
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...ownProps,
    ...state.agent.error,
  };
};

export default connect(mapStateToProps)(Notification);
