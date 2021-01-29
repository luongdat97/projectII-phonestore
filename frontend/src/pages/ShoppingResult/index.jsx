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
    console.log(".........props")
    let initial = this.props.location.state
    let cart = initial.cart
    let total = initial.total
    let customer = initial.customer
    let orderId = initial.orderId

    return (
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
            <Logo />
            <SearchMenu />
            <HomeMenu />
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, display: "flex", justifyContent: 'center' }}>
            <div style={{ minHeight: 750, marginTop: 25, background: '#fff', width: 700 }}>
              <Result
                status="success"
                title="Cảm ơn quý khách đã mua hàng tại Bshop!"
                subTitle="Tổng đài viên BShop sẽ liên hệ đến quý khách trong vòng 5 phút"
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 400 }}>
                  <h3>Thông tin đặt hàng</h3>
                  <Row>
                    <Col span={12}>Mã đơn hàng:</Col>
                    <Col span={12}>{orderId}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>Họ tên khách hàng:</Col>
                    <Col span={12}>{customer.name}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>Số điện thoại:</Col>
                    <Col span={12}>{customer.phoneNumber}</Col>
                  </Row>
                  <h3 style={{paddingTop: 20}}>Đơn hàng</h3>
                  {
                    cart.map(cartItem => (
                      <div style={{ borderTop: 'solid 1px #ddd', padding: 10, display: 'flex' }}>
                        <div style={{ marginRight: 'auto' }}>
                          <a>{cartItem.phone.phoneType.name}</a>
                          <br />
                            màu: {cartItem.phone.color}
                        </div>
                        <div style={{ marginRight: 'auto' }}>x {cartItem.quantity}</div>
                        <div>{cartItem.phone.phoneType.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                      </div>
                    ))
                  }
                  <div style={{ borderTop: 'solid 1px #ddd', padding: 10 }}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: 'auto' }}>Phí vận chuyển:</div>
                      <h3 style={{ color: '#52c41a' }}>Miễn phí!</h3>
                    </div>
                  </div>
                  <div style={{ borderTop: 'solid 1px #ddd', borderBottom: 'solid 1px #ddd', padding: 10, display: 'flex' }}>
                    <h3 style={{ marginRight: 'auto' }}>Thành tiền:</h3>
                    <h3 style={{ color: '#f5222d' }}>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</h3>
                  </div>
                </div>
              </div>
            
              <div style={{ display: 'flex', justifyContent: "center", paddingTop: 20 }}>
                <Button type='primary' onClick={()=> {window.location.href = "/" }}>Mua thêm sản phẩm khác</Button>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
  }
};

export default ShoppingResult;


