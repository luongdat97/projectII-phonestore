import React, { Component, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Card, Rate, Tooltip, Radio, Checkbox, Image, Button, Space, InputNumber, Form, Input, Divider, Empty } from 'antd';
import Logo from "../../components/Logo";
import HomeMenu from "../../components/HomeMenu";
import SearchMenu from "../../components/SearchMenu";
import { useCookies } from 'react-cookie';
import {
  Redirect
} from "react-router-dom";
var axios = require('axios');
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


const Cart = (props) => {
  const [refresh, setRefresh] = useCookies(false);
  const [cookies, setCookie] = useCookies(['cartId']);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [cookies, refresh]);

  const getTotalPrice = () => {
    let total = 0;
    if (data) data.map((phone) => {
      total += parseInt(phone.quantity) * parseInt(phone.phone.phoneType.price)
    });
    return total;
  }

  const getCart = () => {
    let url = 'http://localhost:8080/cart/' + cookies.cartId.data;
    let config = {
      method: 'get',
      url: url,
      headers: {},
    };
    axios(config)
      .then((response) => {
        setData(response.data.cartPhoneDtos)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const saveOrUpdateCartPhone = (phoneId, quantity) => {
    let url = 'http://localhost:8080/cart/' + cookies.cartId.data + '?phoneId=' + phoneId + "&quantity=" + quantity;
    let config = {
      method: 'put',
      url: url,
      headers: {},
      data: {
        cartId: cookies.cartId.data,
        phoneId: phoneId,
        quantity: 1,
      }
    };

    axios(config)
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteCartPhone = (id) => {
    let url = 'http://localhost:8080/cart?id=' + id;
    let config = {
      method: 'delete',
      url: url,
      headers: {},
    };

    axios(config)
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });
    return;

  }

  const deleteData = (index) => {
    deleteCartPhone(data[index].id)
    let array = [...data];
    array.splice(index, 1);
    setData(array)
  }

  const fetchData = () => {
    console.log("cokies................")
    console.log(cookies)
    if (!cookies.cartId) return;
    if (cookies.cartId) {
      getCart()
    }
  }

  let cartDetailList = <Empty description="Bạn chưa thêm gì vào giỏ hàng!" />;
  if (data) cartDetailList = data.map((phoneDdata, index) =>
    <CartDetail datas={data} data={phoneDdata.phone} key={index} quantity={phoneDdata.quantity} setData={setData} index={index} deleteData={deleteData} upDate={saveOrUpdateCartPhone}></CartDetail>
  );

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
        <Logo />
        <SearchMenu />
        <HomeMenu selectedKeys={["1"]} />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ minHeight: 750, marginTop: 25 }}>
          <Row style={{display: 'flex', justifyContent: 'center'}}>
            <Col sm={16} lg={12} style={{background: '#fff', padding: 20}}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                  <h2>Giỏ hàng của bạn</h2>
                  <a style={{ display: "block", marginLeft: 'auto' }} href="/">Mua thêm sản phẩm khác</a>
                </div>

                {cartDetailList}
                <Divider />
                <div style={{ display: 'flex', padding: '0px 50px' }}>
                  {/* <div>
                      <Checkbox>Sử dụng mã giảm giá</Checkbox>
                      <Space>
                        <Input placeholder="Nhập mã" />
                        <Button type="primary">Áp dụng</Button>
                      </Space>

                    </div> */}

                  <h3 style={{ marginLeft: 'auto' }}>Tổng tiền: <span style={{ color: '#f5222d' }}>{getTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span></h3>
                </div>

              {data &&
                  <div>
                    <h2>Thông tin khách hàng</h2>
                    <div style={{display: "flex", justifyContent: 'center'}}>
                      <FormInfo cartData={data} totalPrice={getTotalPrice()} cartId={cookies.cartId.data} />
                    </div>
                    
                  </div>
              }
            </Col>
          </Row>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

          </div>


        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

class CartDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data
    let index = this.props.index
    return (
      <Row gutter={20}>
        <Col span={4} style={{ padding: 15 }}>
          <Image src={process.env.PUBLIC_URL + '/images/phones/' + data.image}></Image>
        </Col>
        <Col span={8}>
          <h3>{data.phoneType.name}</h3>
          <p>Màu: {data.color}</p>
        </Col>
        <Col span={6}>
          <h3>{data.phoneType.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <span style={{ textDecoration: 'underline' }}>đ</span></h3>
        </Col>
        <Col span={4}>
          Số lượng:
                    <InputNumber min={1} max={50} defaultValue={this.props.quantity} onChange={(e) => {
            this.props.upDate(data.id, e)
            let newData = [...this.props.datas];
            newData[index].quantity = e;
            this.props.setData(newData);
          }} />
        </Col>
        <Col span={2}>
          <Button type="text" onClick={() => this.props.deleteData(index)} >
            <i class="fas fa-times"></i>
          </Button>

        </Col>
      </Row>
    );

  }
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: '${label} chưa điền thông tin',
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
  const [redirect, setRedirect] = useState(false);
  const [customer, setCustomer] = useState(null);

  const onFinish = values => {
    console.log(values)
    setCustomer(values.customer)
    setRedirect(true)
  };

  if (redirect) {
    return (
      <Redirect
        push
        to={{
          pathname: "/receive-method",
          state: { customer: customer, cartData: props.cartData, totalPrice: props.totalPrice, cartId: props.cartId }
        }}
      />
    )
  }

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{maxWidth: 500}}>
      <Form.Item name={['customer', 'name']} label="Họ tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['customer', 'email']} label="Email" rules={[{ type: 'email' }, { required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['customer', 'phoneNumber']} label="Số điện thoại" rules={[{ type: 'pattern', pattern: '0[35789][0-9]{8}$' }, { required: true }]}>
        <Input />
      </Form.Item>

        <Row gutter={8}>
          <Col md={12}>
            <Button type="primary" danger htmlType="submit" style={{ height: 75, width: '100%' }}>
              <span style={{ fontWeight: 'bold' }}>TIẾP TỤC</span>
              <br></br>
                Chọn hình thức nhận hàng
            </Button>
          </Col>
          <Col md={12}>
            <Button htmlType="submit" style={{ height: 75 }}>
              <span style={{ fontWeight: 'bold', color: '#0050b3' }}>Đặt hàng luôn</span>
              <br />
                Shop sẽ gọi cho bạn trong vòng 5 phút
            </Button>
          </Col>
        </Row>
          
         

    </Form>
  );
};

export default Cart;
