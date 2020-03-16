import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Sidebar,
  Menu,
  Icon,
  Dropdown,
  Accordion,
  AccordionTitleProps,
  Flag,
  Segment,
  Input,
  Ref,
  Divider,
} from 'semantic-ui-react';
import logo from './logo.png';
import xuan from './xuan.png';
import logoMini from './logo.mini.png';
import { useSelector } from 'react-redux';
import './main.css';
import { Link } from 'react-router-dom';
import SimpleChart from 'components/SimpleChart';
import PovChart from 'components/PovChart';

const getSidebarWidth = (isDefault: boolean): number => {
  return isDefault ? 190 : 60;
};

const rightSidebarWidth = 191;

const trigger = <Image src={xuan} avatar size="mini" />;

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const Agent = (props: any) => {
  const { history } = props;
  const targetRef = useRef();
  const userInfo = useSelector((state: any) => {
    return state.app.userInfo;
  });
  const [useMiniLeftSideBar, toggleLeftSideBar] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const [pageWidth, setPageWidth] = useState(getWidth());
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => setPageWidth(getWidth()), 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const [isRightSideBarShow, toggleRightSideBar] = useState(false);
  useEffect(() => {
    const target: any = targetRef.current;
    const handler = () => toggleRightSideBar(!isRightSideBarShow);
    if (isRightSideBarShow) {
      target.addEventListener('click', handler);
    }
    return () => {
      target.removeEventListener('click', handler);
    };
  });

  if (!userInfo) {
    history.push('/hc');
  }

  const sidebarWidth = getSidebarWidth(!useMiniLeftSideBar);
  const handldeClick = (e: any, props: AccordionTitleProps) => {
    const newIndex = props.index == activeIndex ? -1 : props.index;
    setActiveIndex(Number(newIndex));
  };

  return (
    <React.Fragment>
      <div id="main_wrapper">
        <Sidebar
          id="main_sidebar"
          visible
          as={Menu}
          className={(useMiniLeftSideBar ? 'very thin ' : '') + ' inverted vertical grey secondary'}
          style={{ width: sidebarWidth }}
        >
          <Link to="/agent" className="item agent-logo">
            <Image src={logo} hidden={useMiniLeftSideBar} />
            <Image src={logoMini} hidden={!useMiniLeftSideBar} />
          </Link>
          <Accordion className={(useMiniLeftSideBar ? ' displaynone ' : '') + ' inverted'}>
            <Accordion.Title as={'a'} active={activeIndex === 0} index={0} onClick={handldeClick} className="item">
              <Icon className="titleIcon" name="dashboard" /> Dashboard <Icon name="dropdown" />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Link to="/agent" className="item">
                dashboard v1
              </Link>
            </Accordion.Content>
            <Accordion.Content active={activeIndex === 0}>
              <Link to="/agent/pov_stat" className="item">
                pov
              </Link>
            </Accordion.Content>
          </Accordion>

          <Accordion className={(useMiniLeftSideBar ? ' displaynone ' : '') + ' inverted'}>
            <Accordion.Title as={'a'} active={activeIndex === 1} index={1} onClick={handldeClick} className="item">
              <Icon className="titleIcon" name="app store" /> Apps <Icon name="dropdown" />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Link to="/agent" className="item">
                dashboard v1
              </Link>
            </Accordion.Content>
          </Accordion>

          <Dropdown
            text={null}
            icon={null}
            trigger={<Icon name="dashboard" />}
            className={'item' + (useMiniLeftSideBar ? ' displayblock' : ' displaynone')}
          >
            <Dropdown.Menu>
              <Dropdown.Header>Dashboard</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item>1</Dropdown.Item>
              <Dropdown.Item>2</Dropdown.Item>
              <Dropdown.Item>3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            text={null}
            icon={null}
            trigger={<Icon name="app store" />}
            className={'item' + (useMiniLeftSideBar ? ' displayblock' : ' displaynone')}
          >
            <Dropdown.Menu>
              <Dropdown.Header>Apps</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item>1</Dropdown.Item>
              <Dropdown.Item>2</Dropdown.Item>
              <Dropdown.Item>3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Divider />
        </Sidebar>
        <Sidebar.Pushable>
          <Ref innerRef={targetRef}>
            <Sidebar.Pusher
              dimmed={isRightSideBarShow}
              style={{
                width: pageWidth - sidebarWidth - (isRightSideBarShow ? rightSidebarWidth : 0),
                transform: `translate3d(${sidebarWidth}px,0,0)`,
              }}
            >
              <Menu borderless icon id="topmenu" className="topmenu grid">
                <a
                  className="item"
                  onClick={e => {
                    toggleLeftSideBar(!useMiniLeftSideBar);
                    e.preventDefault();
                  }}
                >
                  <Icon name="align justify" size="large" />
                </a>
                <Menu.Item>
                  <Input placeholder="Search..." icon="search" />
                </Menu.Item>
                <Menu.Menu position="right">
                  {/* <Dropdown text={null} item icon="bell" pointing="top left"> */}
                  <Dropdown text={null} item icon="bell">
                    <Dropdown.Menu>
                      <Dropdown.Header>PEOPLE YOU MIGHT KNOWN</Dropdown.Header>
                      <Dropdown.Item as="a">
                        <Image src={xuan} avatar />
                        Jessie Xie
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown text="Language" item>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Flag name="china" /> Chinese
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown text={null} icon={null} trigger={trigger} item>
                    <Dropdown.Menu>
                      <Dropdown.Item>Inbox</Dropdown.Item>
                      <Dropdown.Item>Profile</Dropdown.Item>
                      <Dropdown.Item>Settings</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>Need Help?</Dropdown.Item>
                      <Dropdown.Item>Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Menu.Item
                    as={'a'}
                    onClick={e => {
                      toggleRightSideBar(!isRightSideBarShow);
                      e.preventDefault();
                    }}
                  >
                    <Icon name="wrench" />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
              <Segment id="agent_page_content">
                <Segment>123</Segment>
                <Segment>
                  {/* <SimpleChart width={400} height={400} /> */}
                  <PovChart />
                </Segment>
              </Segment>
            </Sidebar.Pusher>
          </Ref>
          <Sidebar
            target={targetRef}
            visible={isRightSideBarShow}
            className="right"
            style={{ width: rightSidebarWidth }}
          >
            <Segment placeholder />
          </Sidebar>
        </Sidebar.Pushable>
      </div>
    </React.Fragment>
  );
};

export default Agent;
