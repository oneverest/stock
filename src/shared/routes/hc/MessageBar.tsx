import React, { Component } from 'react';
import { Message, Transition, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearHcMessageAction } from 'store/hc/actions';

interface Props {
  visible: boolean;
  message: string;
  error: boolean;
  [key: string]: any;
}

export class MessageBar extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate() {
    const { visible, message } = this.props;
    if (visible && message) {
      setTimeout(() => {
        this.props.dispatch(clearHcMessageAction());
      }, 3000);
    }
  }

  render() {
    const { visible, message, error } = this.props;
    return (
      <Transition.Group animation="vertical flip" duration={1000}>
        {visible && (
          <Message error={error} success={!error}>
            <Icon name="thumbtack" />
            {message}
          </Message>
        )}
      </Transition.Group>
    );
  }
}

const mapStateToProps = (state: any, ownProps: Props) => {
  return {
    ...ownProps,
    visible: state.hc.messagebar.visible,
    error: state.hc.messagebar.error,
    message: state.hc.messagebar.message,
  };
};

export default connect(mapStateToProps)(MessageBar);
