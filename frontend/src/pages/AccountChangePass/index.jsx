import { Button, Card, Checkbox, Form, Input, Layout, message, Select, Typography } from 'antd';
import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import Logo from "../../components/Logo";
import ManagerMenu from "../../components/ManagerMenu";
import EmployeeMenu from "../../components/EmployeeMenu"
import SearchMenu from "../../components/SearchMenu";
var axios = require('axios');
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Meta } = Card;
const { Title } = Typography;

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [user, setUser] = useState(cookies.user);

    console.log("...........................")
    console.log(user)
    return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Logo notLink={true} />
                    {(user.role.id == 1 || user.role.id == 2) && <ManagerMenu selectedKeys={["6"]} />}
                    {user.role.id == 3 && <EmployeeMenu selectedKeys={["5"]} />}
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 750, background: '#fff', padding: 25 }}> 
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Title level={3}>Đổi mật khẩu</Title>
                        </div>         
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <FormChangePass userId={user.id}/> 
                        </div>
                                                     
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
    );
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  const FormChangePass = (props) => {

    const changeStaffPass = (data) => {
      let url = 'http://localhost:8080/staff/' + props.userId + '/change-password';
      let config = {
          method: 'put',
          url: url,
          headers: {'Content-Type': 'application/json'},
          data: data
      };

      axios(config)
          .then((response) => {
              if (response.data) {
                  message.success("Bạn đã thay đổi mật khẩu thành công!")
                  return;
              }
              message.error("Bạn nhập sai mật khẩu cũ!")
          })
          .catch(function (error) {
              console.log(error);
          });
    }  

    const onFinish = (values) => {
      console.log('Success:', values);
      changeStaffPass(values)
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();
    const [newPassword, setNewPassword] = useState(null)
  
    return (
      <Form 
        form={form}
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{width: 600}}
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: 'Chưa điền thông tin!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: 'Chưa điền thông tin!' }]}
        >
          <Input.Password size="large" onChange={(e) => {setNewPassword(e.target.value)}}/>
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="rePassword"
          rules={[{ type: 'pattern', pattern: newPassword  + '$', message: "Mật khẩu không khớp" },{ required: true, message: 'Chưa điền thông tin!' }]}
        >
          <Input.Password size="large"/>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    );
  };

export default Home;
