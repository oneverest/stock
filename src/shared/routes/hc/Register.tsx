import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Button, Message, InputOnChangeData } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { register_request } from 'services';
import { connect } from 'react-redux';
import { sendHcMessageAction } from 'store/hc/actions';

export class Register extends Component<any> {
  state = { email: '', password: '', confirmPassword: '', error: '' };

  handleInputChange = (e: any, { name, value }: InputOnChangeData) => {
    this.setState({
      ...this.state,
      error: '',
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { error, email, password, confirmPassword } = this.state;
    const { history, dispatch } = this.props;
    if (error.length) {
      return this.setState({
        ...this.state,
        error,
      });
    }

    if ((password.length || confirmPassword.length) && password !== confirmPassword) {
      return this.setState({
        ...this.state,
        error: '密码错误',
      });
    }

    if (!email.length || !password.length || !confirmPassword) {
      return this.setState({
        ...this.state,
        error: '请完整填写注册信息',
      });
    }
    const result = await register_request(email, password);
    if (result.isSuccess) {
      history.push('/hc/login');
    } else {
      dispatch(sendHcMessageAction(String(result.errorValue()), true));
    }
  };

  render() {
    const { error } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            注册账户
          </Header>
          <Message hidden={!error.length} negative>
            {error}
          </Message>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={this.handleInputChange}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleInputChange}
                autoComplete="true"
              />
              <Form.Input
                fluid
                name="confirmPassword"
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                onChange={this.handleInputChange}
                autoComplete="true"
              />

              <Button color="teal" fluid size="large" onClick={this.handleSubmit}>
                提交
              </Button>
            </Segment>
          </Form>
          <Message>
            已有账户? <Link to="/hc/login">去登录</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...ownProps,
    userInfo: state.app.userInfo,
  };
};
export default connect(mapStateToProps)(Register);
