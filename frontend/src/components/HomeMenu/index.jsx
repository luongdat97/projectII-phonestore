import React from "react";
import { Menu } from "antd";
import {Link} from "react-router-dom";

const HomeMenu = (props) => {
  return (
    <div style={{width:410, marginLeft: 'auto'}}>
      <Menu theme="dark" mode="horizontal" selectedKeys={props.selectedKeys} overflowedIndicator={<i class="far fa-bars"></i>}>
        
        <Menu.Item key="1"><Link to="/cart"><i style={{ display: 'inline' }} class="fas fa-shopping-cart"></i> Giỏ hàng</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/history-order"><i style={{ display: 'inline' }} class="fas fa-history"></i> Lịch sử mua hàng</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/login"><i style={{ display: 'inline' }} class="fas fa-sign-in-alt"></i> Đăng nhập</Link></Menu.Item>
      </Menu>
    </div>

  );
};

export default HomeMenu;
