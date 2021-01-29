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
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const user = cookies.user;
  let auth = useAuth();
  let history = useHistory(); 
  return (
    <div style={{width:430, marginLeft: 'auto'}}>
      <Menu theme="dark" mode="horizontal" selectedKeys={props.selectedKeys} overflowedIndicator={<i class="far fa-bars"></i>}>
        <Menu.Item key="1"><Link to="/invoice-management"><i style={{ display: 'inline' }} class="far fa-file-invoice"></i> Hóa đơn</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/order-management"><i style={{ display: 'inline' }} class="far fa-phone-volume"></i> Đơn hàng</Link></Menu.Item>
        <Menu.SubMenu key="SubMenu" icon={<i class="fas fa-user"></i>} title={<>{user.name} <i class="fas fa-chevron-down"></i></>}>
          <Menu.Item key="4"><Link to="/account/info">Thông tin cá nhân</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/account/change-pass">Đổi mật khẩu</Link></Menu.Item>
          <Menu.Item key="6"><Link onClick={() => auth.signout(() => history.push("/"))}><i style={{ display: 'inline' }} class="fas fa-sign-in-alt"></i> Đăng xuất</Link></Menu.Item>

        </Menu.SubMenu>
      </Menu>
      
    </div>

  );
};

export default EmployeeMenu;
