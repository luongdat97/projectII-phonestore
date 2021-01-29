import React, { Component, useEffect, useState } from "react";
import { Layout, Table, Breadcrumb, Row, Col, Card, Rate, Tooltip, Radio, Checkbox, Image, Button, Space, InputNumber, Form, Input, Divider, Empty } from 'antd';
import Logo from "../../components/Logo";
import HomeMenu from "../../components/HomeMenu";
import SearchMenu from "../../components/SearchMenu";
import { useCookies } from 'react-cookie';
import moment from 'moment'
import {
  Redirect
} from "react-router-dom";
var axios = require('axios');
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


const HistoryOrder = (props) => {
  const [refresh, setRefresh] = useCookies(false);
  const [cookies, setCookie] = useCookies(['cartId']);
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {

  }, [cookies, refresh]);

  const fetchData = (phoneNumber) => {
    let url = 'http://localhost:8080/order/by-phone-number';
    let config = {
      method: 'post',
      url: url,
      data: phoneNumber,
      headers: { "Content-type": "application/json" }
    };
    console.log('config..............')
    console.log(config)

    axios(config)
      .then((response) => {
        if (!response.data) response.data = []
        let orders = response.data.map((data, index) => ({
          key: index,
          order: data.id,
          phoneNumber: data.customer.phoneNumber,
          address: data.address,
          customer: data.customer.name,
          date: new moment(data.created).format('HH:mm:ss DD/MM/YYYY'),
          totalMoney: '300000',
          state: data.state,
          detail: data,
          orderMethod: data.orderMethod,
          id: data.id,
          created: data.created

        }))
        setOrders(orders);
        console.log("order...............")
        console.log(orders)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
          <Logo />
          <SearchMenu />
          <HomeMenu selectedKeys={["2"]} />
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ minHeight: 750, background: '#fff' }}>
            <div style={{ display: "flex", justifyContent: 'center' }}>
              <FormInfo fetchData={fetchData}></FormInfo>
            </div>

            {orders != null && orders.length === 0 &&
              <div style={{ display: "flex", justifyContent: 'center' }}>
                <h3>Bạn chưa mua sản phẩm nào với số điện thoại này!</h3>
              </div>            
            }
            {orders != null && orders.length !== 0 &&
              orders.map(data => (
                <OrderDetail data={data} />
              ))
            }


          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  );
};

export default HistoryOrder;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: 'Bạn chưa điền thông tin!',
  types: {
    email: '${label} không hợp lệ!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
  pattern: {
    mismatch: "${label} không hợp lệ !",
  },
};
const FormInfo = (props) => {
  const [customer, setCustomer] = useState(null);

  const onFinish = values => {
    console.log(values)
    setCustomer(values.customer)
    props.fetchData(values.customer.phoneNumber)
  };

  return (
    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{ width: 500, marginTop: 25 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}><h2>Tra cứu thông tin đơn hàng</h2></div>

      <Form.Item name={['customer', 'phoneNumber']} rules={[{ type: 'pattern', pattern: '0[35789][0-9]{8}$' }, { required: true }]}>
        <Input placeholder="Nhập số điện thoại mua hàng" size="large" />
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Button htmlType="submit" type="primary" shape="round" size="large">Xem thông tin lịch sử mua hàng</Button></div>


    </Form>
  );
};

const OrderDetail = (props) => {
  const countTotal = (order) => {
    let total = 0;
    order.orderPhones.map((item) => { total += item.quantity * item.phone.phoneType.price })
    return total
  }
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
    },
  ];
  let data = props.data.detail.orderPhones.map((item, index) => ({
    key: index,
    name: item.phone.phoneType.name + ', ' + item.phone.color,
    quantity: item.quantity,
    price: item.phone.phoneType.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    total: (item.quantity * item.phone.phoneType.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
  }))
  let state = props.data.state;
  let stateString = (state == 4 || state == 5) ? 'Hủy đơn' : (state == 3) ? 'Đã thanh toán' : 'Đang xử lý'
  return (
    <div style={{ display: "flex", justifyContent: 'center', marginTop: 15 }}>
      <Card style={{ width: '500px' }}>
        <h3>Đơn hàng #{props.data.order}</h3>
        <span>Ngày tạo: {props.data.date}</span>
        <br />
        <span>trạng thái: {stateString}</span>
        <Table columns={columns} dataSource={data}></Table>
        <div style={{ padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
          <h3>Thành tiền: </h3>
          <h3>{countTotal(props.data.detail).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</h3>
        </div>
      </Card>
    </div>
  )
}
