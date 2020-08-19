import React from 'react';
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import { Layout, Menu } from 'antd';
import {
  TeamOutlined
} from '@ant-design/icons';

import { history } from '../store'

import CreateRoom from './Room/CreateRoom'
import Room from './Room/Room';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Rooms">
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Content style={{ margin: '16px' }}>
            <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
                <Switch>
                  <Route exact path="/" render={() => (<CreateRoom />)} />
                  <Route render={() => (<Room />)} />
                </Switch>
            </ConnectedRouter>
          </Content>
        </Layout>
      </Layout>
    
  );
}

export default App;
