import React, { Component, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Card, Rate, Tooltip, Radio, Checkbox, Image, Button, Space, InputNumber, Form, Input, Divider, Select } from 'antd';
import Logo from "../../components/Logo";
import HomeMenu from "../../components/HomeMenu";
import SearchMenu from "../../components/SearchMenu";
import { Redirect } from "react-router-dom"
var axios = require('axios');
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const Option = Select.Option;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: 'Chưa điền thông tin',
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


class ReceiveMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiveMethod: 1, //0: Nhận tại cửa hàng, 1: shipping
      stores: null,
      provinces: null,
      selectedProvince: null,
      districts: null,
      selectedDistrict: null,
      paymentMethod: null,
      finish: false,
      orderId: null,
    }
  }

  setPaymentMethod = (paymentMethod) => {
    this.setState({ paymentMethod })
  }

  setOrderId = (orderId) => {
    this.setState({ orderId })
  }

  setFinish = (orderId, finish) => {
    this.setState({ orderId, finish })
  }

  setStores = (stores) => {
    this.setState({ stores })
  }

  setProvinces = (provinces) => {
    this.setState({ provinces })
  }

  setDistricts = (districts) => {
    this.setState({ districts })
  }

  setSelectedProvince = (selectedProvince) => {
    this.fetchDistrict(selectedProvince)
    this.setState({ selectedProvince, selectedDistrict: null })
  }

  setSelectedDistrict = (selectedDistrict) => {
    this.setState({ selectedDistrict })
  }

  fetchData = () => {


    let url = 'http://localhost:8080/store';

    let config = {
      method: 'get',
      url: url,
    };

    axios(config)
      .then((response) => {
        this.setStores(response.data);
        console.log("store..........................")
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchProvince = () => {
    let url = 'https://vapi.vnappmob.com/api/province';

    let config = {
      method: 'get',
      url: url,
    };

    axios(config)
      .then((response) => {
        this.setProvinces(response.data.results);
        console.log("provincé................")
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchDistrict = (selectedProvince) => {
    let url = 'https://vapi.vnappmob.com/api/province/district/' + selectedProvince;

    let config = {
      method: 'get',
      url: url,
    };

    axios(config)
      .then((response) => {
        this.setDistricts(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  postOrder = (data) => {
    let url = 'http://localhost:8080/order';

    let config = {
      method: 'post',
      url: url,
      data: data
    };

    axios(config)
      .then((response) => {
        console.log("haha.............")
        console.log(response)
        this.setFinish(response.data, true)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onReceiveMethodChange = (receiveMethod) => {
    this.setState({ receiveMethod: receiveMethod });
  }

  componentDidMount() {
    this.fetchData();
    this.fetchProvince();
  }

  onFinish = (value, cart, customer, cartId) => {
    console.log("onfinish...........")
    console.log(value)
    let orderPhones = cart.map((cartItem) => ({
      phone: { id: cartItem.phone.id },
      quantity: cartItem.quantity,
    }))

    let address = null;
    let store = null;
    let orderMethod = this.state.receiveMethod
    if (orderMethod == 1) {
      let provinceName = this.state.provinces.find(province => province.province_id == value.shipAddress.province).province_name;
      let districtName = this.state.districts.find(district => district.district_id == value.shipAddress.district).district_name;
      address = provinceName + ", " + districtName + ", " + value.shipAddress.address
    } else {
      store = {
        id: value.store
      }
    }


    let order = {
      orderMethod: orderMethod,
      paymentMethod: value.payMethod,
      address: address,
      store: store,
      orderPhones: orderPhones,
      state: 0,
    }
    let data = {
      customer: customer,
      order: order,
      cartId: cartId
    }
    console.log(data)
    this.postOrder(data)
  }

  render() {
    let initial = this.props.location.state
    let customer = initial.customer;
    let cart = initial.cartData;
    let total = initial.totalPrice;
    let cartId = initial.cartId;
    let payMethodCode = this.state.paymentMethod;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    let shopMethodStyle;
    let shipMethodStyle;
    if (this.state.receiveMethod == 0) {
      shopMethodStyle = {
        type: 'primary',
        color: '',
        display: true,
      };
      shipMethodStyle = {
        type: '',
        color: '#40a9ff',
        display: false,
      };
    } else {
      shopMethodStyle = {
        type: '',
        color: '#40a9ff',
        display: false,
      };
      shipMethodStyle = {
        type: 'primary',
        color: '',
        display: true,
      };
    }

    return (
      <>
        {
          this.state.finish &&
          <Redirect
            push
            to={{
              pathname: "/shopping-result",
              state: { customer: customer, cart: cart, total: total, orderId: this.state.orderId }
            }}
          />
        }

        {!this.state.finish &&
          <>
            <Layout>
              <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Logo />
                <SearchMenu />
                <HomeMenu />
              </Header>
              <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div style={{ minHeight: 750, marginTop: 25 }}>
                  <Row gutter={40}>
                    <Col span={14} style={{ background: "#fff", padding: 25 }}>
                      <div style={{ display: 'flex' }}>
                        <h2 style={{ marginRight: 'auto' }}>1. Thông tin khách hàng</h2>
                        <a>Sửa thông tin</a>
                      </div>

                      <Row>
                        <Col span={4} style={{ fontWeight: 'bold' }}>Họ tên:</Col>
                        <Col span={4}>{customer.name}</Col>
                      </Row>
                      {
                        customer.email &&
                        <Row>
                          <Col span={4} style={{ fontWeight: 'bold' }}>Email:</Col>
                          <Col span={4}>{customer.email}</Col>
                        </Row>
                      }

                      <Row>
                        <Col span={4} style={{ fontWeight: 'bold' }}>Số điện thoại:</Col>
                        <Col span={4}>{customer.phoneNumber}</Col>
                      </Row>

                      <Form {...layout} validateMessages={validateMessages} style={{ marginTop: 20 }} onFinish={(value) => this.onFinish(value, cart, customer, cartId)}>
                        <h2>2. Phương thức nhận hàng</h2>
                    Chọn phương thức nhận hàng sẽ giúp bạn nhận được sản phẩm nhanh hơn
                    <Space style={{ margin: '20px 0px' }}>

                      <Button type={shipMethodStyle.type} style={{ height: 100 }} onClick={() => { this.onReceiveMethodChange(1) }}>
                          <span style={{ fontWeight: 'bold', fontSize: '3em', color: shipMethodStyle.color }}><i class="fas fa-shipping-fast"></i></span>
                          <br />
                          Giao hàng tận nơi, miễn phí!
                      </Button>
                      <Button type={shopMethodStyle.type} style={{ height: 100 }} onClick={() => { this.onReceiveMethodChange(0) }}>
                        <span style={{ fontWeight: 'bold', fontSize: '3em', color: shopMethodStyle.color }}><i class="fas fa-store"></i></span>
                        <br></br>
                        Nhận hàng tại cửa hàng Bshop
                      </Button>

                          
                        </Space>
                        <div style={{ maxWidth: 500 }}>
                          {
                            shipMethodStyle.display &&
                            <FormShipping provinces={this.state.provinces} setSelectedProvince={this.setSelectedProvince}
                              districts={this.state.districts}
                              setSelectedDistrict={this.setSelectedDistrict}
                              selectedProvince={this.state.selectedProvince}
                              selectedDistrict={this.state.selectedDistrict}
                            />
                          }

                          {
                            shopMethodStyle.display &&
                            <FormShopAddress data={this.state.stores} />
                          }
                        </div>
                        <h2>3. Chọn hình thức thanh toán</h2>
                        <Form.Item name={'payMethod'} rules={[{ required: true }]}>
                          <Radio.Group onChange={(value) => this.setPaymentMethod(value)}>
                            <Radio style={radioStyle} value={1}>
                              Trả tiền mặt khi nhận hàng
                        </Radio>
                            <Radio style={radioStyle} value={2}>
                              Thẻ ATM nội địa/ Internet banking
                        </Radio>
                            <Radio style={radioStyle} value={3}>
                              Thanh toán bằng thẻ tín dụng (Visa, MasterCard, JCB)
                        </Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Button type='primary' htmlType="submit" danger style={{ width: 300, height: 100, display: "block", marginTop: 20 }}>
                          <span style={{ fontWeight: 'bold', fontSize: '3em' }}><i class="fas fa-cart-arrow-down"></i></span>
                          <br></br>
                    Đặt hàng
                  </Button>
                      </Form>

                    </Col>
                    <Col span={10} style={{ paddingRight: 50 }}>
                      <Card>
                        <h2>Đơn hàng</h2>
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
                            <div style={{ marginRight: 'auto' }}>Tạm tính:</div>
                            <div>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: 'auto' }}>Phí vận chuyển:</div>
                            <h3 style={{ color: '#52c41a' }}>Miễn phí!</h3>
                          </div>
                        </div>
                        <div style={{ borderTop: 'solid 1px #ddd', borderBottom: 'solid 1px #ddd', padding: 10, display: 'flex' }}>
                          <h3 style={{ marginRight: 'auto' }}>Thành tiền:</h3>
                          <h3 style={{ color: '#f5222d' }}>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</h3>
                        </div>
                      </Card>

                    </Col>
                  </Row>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </>}
      </>

    );
  }

};


const FormShipping = (props) => {
  const onFinish = values => {
    console.log(values);
  };
  console.log('props......')
  console.log(props)
  return (
    <>

      <Form.Item name={['shipAddress', 'province']} label="Tỉnh/Thành phố" rules={[{ required: true }]}>
        <Select
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          placeholder="Chọn tỉnh/thành phố"
          allowClear
          onChange={(value) => props.setSelectedProvince(value)}
        >
          {props.provinces && props.provinces.map(province => (
            <Option key={province.province_id} value={province.province_id}>{province.province_name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item key={"aaa"} name={['shipAddress', 'district']} label="Quận/Huyện" rules={[{ required: true }]} valuePropName>
        <Select
          placeholder="Chọn quận/huyện"
          onChange={(value) => props.setSelectedDistrict(value)}
          value={props.selectedDistrict}

        >
          {props.districts && props.districts.map(district => (
            <Option key={district.district_id} value={district.district_id}>{district.district_name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name={['shipAddress', 'address']} label="Địa chỉ" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

    </>

  );
};

const FormShopAddress = (props) => {

  return (
    <Form.Item name={'store'} label="Chọn cửa hàng" rules={[{ required: true }]}>
      <Select
        placeholder="Chọn cửa hàng bạn muốn đến"
        allowClear
      >
        {
          props.data && props.data.map(store => (
            <Option key={store.id} value={store.id}>{store.address}</Option>
          ))
        }
      </Select>
    </Form.Item>
  );
};

export default ReceiveMethod;
