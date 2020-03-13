import React, { Component } from 'react';
import { Segment, Container, Menu, Image, Button, Input, Dropdown } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import css from './hc.module.css';
import logo from './logo.png';
import loginUserLogo from './helen.jpg';
import Login from './login';
import MessageBar from './MessageBar';
import { connect } from 'react-redux';
import { checkLoginAction, logoutAction } from 'store/app/actions';
import Register from './Register';

interface Props {
  userInfo: any;
  [key: string]: any;
}

declare module 'semantic-ui-react' {
  export interface DropdownProps {
    text: any;
  }
}

const Trigger = (props: any) => (
  <span>
    <Image src={loginUserLogo} avatar /> {props.name}
  </span>
);

export class HelpCenter extends Component<Props> {
  componentDidMount() {
    // 检查用户是否已经登录
    this.props.dispatch(checkLoginAction());
  }

  handleLogout = () => {
    // 执行登出操作
    this.props.dispatch(logoutAction());
  };

  render() {
    const { userInfo } = this.props;
    return (
      <React.Fragment>
        <Segment vertical>
          <Container>
            <MessageBar visible={false} error={false} message={''} />
            <Menu secondary>
              <Menu.Item as={Link} to="/hc">
                <Image src={logo} inline size="small" />
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item as="a">Home</Menu.Item>
                <Menu.Item as="a">Community</Menu.Item>
                <Menu.Item as="a">Topics</Menu.Item>
                {userInfo ? (
                  ''
                ) : (
                  <Menu.Item>
                    <Button circular basic color="red" content="注册" as={Link} to="/hc/register" />
                  </Menu.Item>
                )}
                {userInfo ? (
                  <Dropdown
                    item
                    pointing="top right"
                    className={`${css.loginDropDown} basic`}
                    as={Button}
                    text={null}
                    icon={null}
                    trigger={<Trigger name={userInfo.name} />}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/agent">
                        进入控制台
                      </Dropdown.Item>
                      <Dropdown.Divider className={css.loginDropDownDivider} />
                      <Dropdown.Item onClick={this.handleLogout}>退出</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Menu.Item>
                    <Button basic as={Link} to="/hc/login">
                      Login
                    </Button>
                  </Menu.Item>
                )}
              </Menu.Menu>
            </Menu>
          </Container>
        </Segment>
        <Segment id={css.kbHeaderAddon} vertical textAlign="center">
          <Container text>
            <Input fluid size="big" icon="search" placeholder="Search..." />
          </Container>
        </Segment>

        <Segment vertical>
          <Route path="/hc/login" component={Login} />
          <Route path="/hc/register" component={Register} />
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any, ownProps: Props) => {
  return {
    ...ownProps,
    userInfo: state.app.userInfo,
  };
};
export default connect(mapStateToProps)(HelpCenter);
