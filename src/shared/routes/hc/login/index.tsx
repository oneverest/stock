import React, { Component } from 'react';
import { Form, Input, Checkbox, Button, Container, Segment, Grid, InputOnChangeData, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loginAction } from 'store/app/actions';
import { Link } from 'react-router-dom';

interface LoginProps {
  userInfo: any;
  [key: string]: any;
}

interface LoginStates {
  email: string;
  password: string;
}

class Login extends Component<LoginProps, LoginStates> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async handleSubmit(e: React.FormEvent) {
  async handleSubmit() {
    const { email, password } = this.state;
    await this.props.dispatch(loginAction(email, password));
  }

  handleChange = (e: any, { name, value }: InputOnChangeData) => {
    const state = Object.create(this.state);
    this.setState({
      ...state,
      [name]: value,
    });
  };

  componentDidUpdate() {
    if (this.props.userInfo) {
      this.props.history.push('/hc');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container text>
          <Grid columns={2} centered>
            <Grid.Column>
              <Segment vertical>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>用户名</label>
                    <Input
                      autoComplete="true"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      placeholder="输入用户名"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>密码</label>
                    <Input
                      autoComplete="true"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      type="password"
                      placeholder="输入密码"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox label="同意以上服务条款" />
                  </Form.Field>
                  <Button type="submit">提交</Button>
                </Form>
                <Message>
                  新用户? <Link to="/hc/register">点此注册</Link>
                </Message>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any, ownProps: LoginProps) => {
  return {
    ...ownProps,
    userInfo: state.app.userInfo,
  };
};
export default connect(mapStateToProps)(Login);
