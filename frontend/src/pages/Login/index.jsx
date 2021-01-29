import React, { Component, useEffect } from "react";
import { Layout, Card, Checkbox, Button, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import {useAuth} from '../../services/authenticate'
import {
  useHistory,
  useLocation
} from "react-router-dom";
var axios = require('axios');
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const Option = Select.Option;

const Login = () => {

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  const counter = useSelector(state => state)
  console.log("state.......................")
  console.log(counter)
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies(['user']);

  if (cookies.user) {
    let initial
    let user = cookies.user
    if (user.role.id == 3) initial = {from: {pathname : "/order-management"}}
    if (user.role.id == 2) initial = {from: {pathname : "/product-management"}}
    if (user.role.id == 1) initial = {from: {pathname : "/account-management"}}
    history.replace(initial.from)
  }

  const login = (username, password, remember) => {
    let url = 'http://localhost:8080/authenticate';
      let config = {
        method: 'post',
        url: url,
        headers: {},
        data: {
          username: username,
          password: password,
        }
      };
      axios(config)
        .then((response) => {
          console.log(".......token")
          console.log(response.data)
          let user = response.data
          auth.signin(user, () => {
            console.log('.........') 
            console.log(user)
            let initial
            if (user.role.id == 3) initial = {from: {pathname : "/order-management"}}
            if (user.role.id == 2) initial = {from: {pathname : "/product-management"}}
            if (user.role.id == 1) initial = {from: {pathname : "/account-management"}}
            let { from } = location.state || initial ;
            history.replace(from);
          });
          dispatch({ type: 'ADD_USER', payload: user})
        })
        .catch(function (error) {
          console.log(error);
          message.error("Sai mật khẩu hoặc tên đăng nhập!")
        });
  }

  
    return (
      <>
            <div style={{ background: '#F0F2F5', display: 'flex', justifyContent: 'center', padding: '50px 0px'}}>
              
                <img src='https://drive.google.com/uc?id=1sHV4K6H9pDXZqxJ-4vY7dKtfT7gwgkNk' style={{width: 500, height: 'auto', objectFit: 'cover'}}></img>
              
              <FormLogin login={login}></FormLogin>
            </div>
          
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        
      </>
    );
 
};



const FormLogin = (props) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };

  const onFinish = values => {
    console.log('Success:', values);
    props.login(values.username, values.password, values.remember)
  };

  // const onFinishFailed = errorInfo => {
  //   message.error('Tên đăng nhập hoặc mật khẩu không đúng!');
  // };

  return (
    <Card style={{width: 500, height: 600}}>
      <h2>Đăng nhập</h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: 'Bạn chưa điền tên đăng nhập!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Bạn chưa điền mật khẩu !' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Ghi nhớ cho lần đăng nhập sau</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" ghost style={{width: '100%'}}>
            Tạo tài khoản
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <a>Bạn quên mật khẩu ?</a>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;



