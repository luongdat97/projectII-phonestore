import React from "react";
import { Menu } from "antd";
import {Link} from "react-router-dom"
import {useAuth} from '../../services/authenticate'
import {
  useHistory,
  useLocation
} from "react-router-dom";
import { useCookies } from 'react-cookie';


const EmployeeMenu = (props) => {
  let auth = useAuth();
  let history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const user = cookies.user;
  return (
    <div style={{width:720, marginLeft: 'auto'}}>
      <Menu theme="dark" mode="horizontal" selectedKeys={props.selectedKeys} overflowedIndicator={<i class="far fa-bars"></i>}>
        <Menu.Item key="1"><Link to="/account-management"><i style={{ display: 'inline' }} class="far fa-file-invoice"></i> Quản lý tài khoản</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/product-management"><i style={{ display: 'inline' }} class="far fa-mobile-android-alt"></i> Sản phẩm</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/product-import"><i style={{ display: 'inline' }} class="far fa-file-import"></i> Nhập hàng</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/statistical"><i style={{ display: 'inline' }} class="far fa-file-chart-line"></i> Thống kê</Link></Menu.Item>
        <Menu.SubMenu key="SubMenu" icon={<i class="fas fa-user"></i>} title={<>{user.name} <i class="fas fa-chevron-down"></i></>}>
          <Menu.Item key="5"><Link to="/account/info">Thông tin cá nhân</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/account/change-pass">Đổi mật khẩu</Link></Menu.Item>
          <Menu.Item key="7"><Link onClick={() => auth.signout(() => history.push("/"))}><i style={{ display: 'inline' }} class="fas fa-sign-in-alt"></i> Đăng xuất</Link></Menu.Item>

        </Menu.SubMenu>
      </Menu>
    </div>

  );
};

export default EmployeeMenu;
