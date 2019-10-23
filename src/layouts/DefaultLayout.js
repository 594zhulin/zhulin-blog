import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Home from '../containers/Home';
import Category from '../containers/Category';
import File from '../containers/File';
import About from '../containers/About';
import './defaultLayout.less';

const { Header, Content, Footer } = Layout;

class DefaultLayout extends Component {
  state = {
    current: 'home',
    open: false
  };
  showMenu = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    const { open } = this.state;
    return (
      <Layout className="default-layout">
        <Header className="header">
          <div className="menu">
            <div
                className={open ? 'menu-btn menu-opened' : 'menu-btn'}
                onClick={this.showMenu}
            >
              MENU
            </div>
            <Menu
                className={open ? 'nav open' : 'nav'}
                mode="horizontal"
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
            >
              <Menu.Item key="home">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="category">
                <Link to="/category">分类</Link>
              </Menu.Item>
              <Menu.Item key="file">
                <Link to="/file">归档</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">关于</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="site">
            <h1 className="title">ZHULIN</h1>
            <div className="tagline">易燃易爆炸</div>
            <div className="social">
              <Icon type="wechat" />
              <Icon type="weibo" />
              <Icon type="qq" />
              <Icon type="github" />
            </div>
          </div>
        </Header>
        <Content className="body">
          <div className="body-wrap">
            <Route component={Home} exact path="/" />
            <Route component={Category} path="/category" />
            <Route component={File} path="/file" />
            <Route component={About} path="/about" />
          </div>
        </Content>
        <Footer className="footer">copyright by zhulin ©2019 | 蜀ICP备18032341号</Footer>
      </Layout>
    );
  }
}

export default DefaultLayout;
