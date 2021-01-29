import React, { Component, useEffect } from "react";
import { Layout, Menu, Typography, Carousel, Row, Col, Card, Rate, Tooltip, Radio, Checkbox,Divider } from 'antd';
import Logo from "../../components/Logo";
import HomeMenu from "../../components/HomeMenu";
import SearchMenu from "../../components/SearchMenu";
const CheckboxGroup = Checkbox.Group;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { Title } = Typography;
var axios = require('axios');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneData: null,
      sorter: "best_sell",
      filter: {
        filterBrand: ["all"],
        filterPrice: ["all"],
        filterBattery: ["all"],
        filterScreenSize: ["all"],
      },
    }
  }
  onPhoneDataChange = (phoneData) => {
    this.setState({ phoneData: phoneData });
  }

  onSorterChange = (sorter) => {
    this.setState({sorter});
  }

  onFilterBrandChange = (filterBrand) => {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        filterBrand: filterBrand
      }
    }))
  }
  onFilterPriceChange = (filterPrice) => {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        filterPrice: filterPrice
      }
    }))
  }
  onFilterBatteryChange = (filterBattery) => {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        filterBattery: filterBattery
      }
    }))
  }
  onFilterScreenSizeChange = (filterScreenSize) => {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        filterScreenSize: filterScreenSize
      }
    }))
  }
  fetchData = (sorter, filter) => {

    if (!sorter || !filter) {
      sorter = this.state.sorter;
      filter = this.state.filter;
    }
    let url = 'http://localhost:8080/phone?';


    url += 'sorter=' + sorter + '&';

    for (let key in filter) {
      url += key + '=' + filter[key] + '&'
    }

    console.log("linkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    console.log(url)

    let config = {
      method: 'get',
      url: url,
      headers: {}
    };

    axios(config)
      .then((response) => {
        let phoneData = response.data.map((data, index) => ({
          key: index,
          ...data
        }));
        phoneData.forEach((phoneData) => {
          for (let key in phoneData) {
            if (phoneData[key] == null) phoneData[key] = '';
          }
        });
        console.log(phoneData)
        this.onPhoneDataChange(phoneData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    this.fetchData(this.state.sorter, this.state.filter);
  }
  componentDidUpdate(prevProps, prevState) {
    // only update if searchValue has changed
    if (prevState.sorter !== this.state.sorter
      || prevState.filter !== this.state.filter 
      ) {
       this.fetchData();
    }
  }

  render() {
    
    return (
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
            <Logo />
            <SearchMenu />
            <HomeMenu />
          </Header>
          <Content className="site-layout" style={{ padding: '0 5%', marginTop: 64 }}>
            <div className="site-layout-background" style={{ minHeight: 380 }}>
              <CarouselHome />
              <br />
              <Row>
                <Col md={6}>
                  <Filter 
                    onFilterBatteryChange={this.onFilterBatteryChange}
                    onFilterBrandChange={this.onFilterBrandChange}
                    onFilterPriceChange={this.onFilterPriceChange}
                    onFilterScreenSizeChange={this.onFilterScreenSizeChange}
                    filter={this.state.filter}
                  />
                </Col>
                <Col md={18} style={{ background: '#fff', padding: 15, borderRadius: 10 }}>
                  <SortOption onSorterChange={this.onSorterChange} />
                  <br />
                  <PhonesList phoneData={this.state.phoneData} />
                </Col>
              </Row>

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
  }

};

export default Home;
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselHome = () => {
  return (
    <Carousel autoplay >
      <div>
        <img src={"https://drive.google.com/uc?id=1ao0ceIDeFoysqIZNYXk7I6P-GhravY8a"} style={{ width: '100%', height: 'auto' }}></img>
      </div>
      <div>
        <img src={"https://drive.google.com/uc?id=1Wle3de0lfPb4W6n8FW0cAaQPCJ5SE5vO"} style={{ width: '100%', height: 'auto' }}></img>
      </div>
      <div>
        <img src={"https://drive.google.com/uc?id=1iAwLNyjDWYKI_q4OyHkikyyEDFmS5pED"} style={{ width: '100%', height: 'auto' }}></img>
      </div>
    </Carousel>
  )
}
const SortOption = (props) => {
  return (
    <div>
      <h3 style={{ display: 'inline' }}>Sắp xếp: </h3>
      <Radio.Group defaultValue="best_sell" buttonStyle="solid" onChange={(e) => {
        props.onSorterChange(e.target.value);
      }}>
        <Radio.Button value="best_sell">Bán chạy nhất</Radio.Button>
        <Radio.Button value="expensive">Giá cao</Radio.Button>
        <Radio.Button value="low_price">Giá thấp</Radio.Button>
        <Radio.Button value="launch_date">Mới ra mắt</Radio.Button>
      </Radio.Group>
    </div>
  )
}
const Filter = (props) => {
  return (
    <div>
      <h2>Lọc kết quả theo: </h2>

      <Checkbox.Group style={{ width: '100%' }} value={props.filter.filterBrand} onChange={(value) => {
        let indexOfAll = value.indexOf("all");
        let arrayLength  = value.length;
        if (arrayLength >= 2 && indexOfAll == 0 ) {value.splice(indexOfAll, 1)};
        if ((arrayLength >= 2 && indexOfAll > 0 ) || arrayLength === 0 ) {value = ['all']};
        props.onFilterBrandChange(value);
      }}>
        <h3>Hãng sản xuất</h3>
        <Row gutter={[16, 8]} style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Col span={12}>
            <Checkbox value="all">Tất cả</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="iphone">Iphone</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="samsung">Samsung</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="oppo">Oppo</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="vsmart">Vsmart</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="realme">Realme</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="vivo">Vivo</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="huawei">Huawei</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="nokia">Nokia</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>

      <Checkbox.Group style={{ width: '100%' }} value={props.filter.filterPrice} onChange={(value) => {
        let indexOfAll = value.indexOf("all");
        let arrayLength  = value.length;
        if (arrayLength >= 2 && indexOfAll == 0 ) {value.splice(indexOfAll, 1)};
        if ((arrayLength >= 2 && indexOfAll > 0 ) || arrayLength === 0 ) {value = ['all']};
        props.onFilterPriceChange(value);
      }}>
        <h3>Mức giá</h3>
        <Row gutter={[16, 8]} style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Col span={12}>
            <Checkbox value="all">Tất cả</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="0-2">Dưới 2 triệu</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="2-4">Từ 2 - 4 triệu</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="4-7">Từ 4 - 7 triệu</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="7-13">Từ 7 - 13 triệu</Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox value="13-100">Trên 13 triệu</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>

      <Checkbox.Group style={{ width: '100%' }}  value={props.filter.filterBattery} onChange={(value) => {
        let indexOfAll = value.indexOf("all");
        let arrayLength  = value.length;
        if (arrayLength >= 2 && indexOfAll == 0 ) {value.splice(indexOfAll, 1)};
        if ((arrayLength >= 2 && indexOfAll > 0 ) || arrayLength === 0 ) {value = ['all']};
        props.onFilterBatteryChange(value);
      }}>
        <h3>Dung lượng pin</h3>
        <Row gutter={[16, 8]} style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Col span={24}>
            <Checkbox value="all">Tất cả</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="0-3000">Dưới 3000 mAh</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="3000-4000">Từ 3000 - 4000 mAh</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="4000-100000">trên 4000 mAh</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>

      <Checkbox.Group style={{ width: '100%' }}  value={props.filter.filterScreenSize} onChange={(value) => {
        let indexOfAll = value.indexOf("all");
        let arrayLength  = value.length;
        if (arrayLength >= 2 && indexOfAll == 0 ) {value.splice(indexOfAll, 1)};
        if ((arrayLength >= 2 && indexOfAll > 0 ) || arrayLength === 0 ) {value = ['all']};
        props.onFilterScreenSizeChange(value);
      }}>
        <h3>Màn hình</h3>
        <Row gutter={[16, 8]} style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Col span={24}>
            <Checkbox value="all">Tất cả</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="0-5">Nhỏ: dưới 5 inch</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="5-6">vừa tay: 5 - 6 inch</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="6-100">lớn: trên 6 inch</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>

    </div>
  )
}
class PhonesList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let phoneData = null;
    if (this.props.phoneData) phoneData = this.props.phoneData.map((phoneData) =>
      <Col md={12} lg={8} xl={6} key={phoneData.key}>
        <Phone phoneData={phoneData} phoneImgUrl={process.env.PUBLIC_URL + '/images/phones/' + phoneData.image}></Phone>
      </Col>
    )
    return (
      <div>
        <Row gutter={[16, 16]}>
          {phoneData}
        </Row>
      </div>
    )
  }

}

class Phone extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const phoneData = this.props.phoneData;
    return (
      <Card
        hoverable
        style={{ width: '100%', paddingBottom: 0 }}
        cover={<img alt="example" style={{padding: 15, paddingBottom: 0}} src={this.props.phoneImgUrl} />}
      >
        <a href={"http://localhost:3000/phone-detail/" + phoneData.id}>
          <h3 className="card-link">{phoneData.name}</h3>
          <h4 style={{ color: "#f5222d" }}> {phoneData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <span style={{ textDecoration: "underline" }}>đ</span> </h4>
        </a>
        <p>
          {/* <Tooltip title="CPU">
            <i class="fas fa-microchip" style={{ color: "#B6BFC7" }}></i><span> {phoneData.cpu} </span>
          </Tooltip> */}
          <Tooltip title="Màn hình">
            <i class="fas fa-mobile-alt" style={{ color: "#B6BFC7" }}></i><span> {phoneData.screenSize + '"'} &nbsp; </span>
          </Tooltip>
          <Tooltip title="Ram">
            <i class="fas fa-memory" style={{ color: "#B6BFC7" }}></i><span> {phoneData.ram}&nbsp; </span>
          </Tooltip>
          <Tooltip title="Dung lượng pin">
            <i class="fas fa-hdd" style={{ color: "#B6BFC7" }}></i><span> {phoneData.battery + " mAh"} </span>
          </Tooltip>
        </p>

      </Card>
    )
  }
}
