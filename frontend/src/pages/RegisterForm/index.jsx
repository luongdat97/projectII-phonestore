import React, { Component, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Card, Result, Rate, Tooltip, Radio, Checkbox, Image, Button, Space, InputNumber, Form, Input, Divider, Select } from 'antd';
import Logo from "../../components/Logo";
import HomeMenu from "../../components/HomeMenu";
import SearchMenu from "../../components/SearchMenu";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const Option = Select.Option;

class ShoppingResult extends React.Component {

  render() {
    return (
      <>
            <div style={{ background: '#F0F2F5', display: 'flex', justifyContent: 'center', padding: '50px 0px'}}>
              
                <img src='https://drive.google.com/uc?id=1sHV4K6H9pDXZqxJ-4vY7dKtfT7gwgkNk' style={{width: 500, height: 'auto', objectFit: 'cover'}}></img>
              
              <Demo></Demo>
            </div>
          
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        
      </>
    );
  }
};

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
const tailLayout = {
  wrapperCol: { offset: 7, span: 17 },
};

const Demo = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card style={{width: 500, height: 600}}>
      <h2>Đăng ký</h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Họ tên"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu"
          name="rePassword"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Tạo tài khoản
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" ghost htmlType="submit" style={{width: '100%'}}>
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <a><i class="fas fa-home-lg-alt"></i> Về trang chủ</a>
        </Form.Item>
      </Form>
    </Card>
    
  );
};

export default ShoppingResult;



