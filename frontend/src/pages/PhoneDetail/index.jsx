import React, { Component, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Card, Rate, Tooltip, Radio, Checkbox, Image, Button, Space } from 'antd';
import Logo from "../../components/Logo";
import HomeMenu from "../../components/HomeMenu";
import SearchMenu from "../../components/SearchMenu";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useCookies } from 'react-cookie';
var axios = require('axios');

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const App = (props) => {
    const [cookies, setCookie] = useCookies(['cartId']);
    const createNewCart = (phoneId) => {
        let url = 'http://localhost:8080/cart?phoneDetailId=' + phoneId;
        let config = {
            method: 'post',
            url: url,
            headers: {},
        };

        axios(config)
            .then((response) => {
                setCookie('cartId', response, { path: '/' });
                window.location.href= 'http://localhost:3000/cart'
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
                window.location.href= 'http://localhost:3000/cart'
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return <PhoneDetail createNewCart={createNewCart} saveOrUpdateCartPhone={saveOrUpdateCartPhone} cookies={cookies} id={props.match.params.id} />;

}

class PhoneDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneData: null,
            selectedColor: null,
        }
    }
    onSelectedColorChange = (selectedColor) => {
        this.setState({ selectedColor });
    }
    fetchData = () => {

        let url = 'http://localhost:8080/phone-detail/' + this.props.id;

        console.log("linkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        console.log(url)

        let config = {
            method: 'get',
            url: url,
            headers: {}
        };

        axios(config)
            .then((response) => {
                let phoneData = response.data;
                this.setState({ phoneData: phoneData, selectedColor: phoneData.phoneDtos[0].color });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount() {
        this.fetchData();
    }

    render() {
        let phoneData = this.state.phoneData;
        return (
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                        <Logo />
                        <SearchMenu />
                        <HomeMenu />
                    </Header>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                        {phoneData &&
                            <div style={{ minHeight: 750 }}>
                                <Row gutter={40} style={{ marginTop: 30 }}>
                                    <Col md={18} style={{ background: '#fff', paddingTop: 20 }}>
                                        <Row>
                                            <Col md={12} style={{ padding: "0px 50px" }}>
                                                <PhoneCarousel phoneData={this.state.phoneData} onSelectedColorChange={this.onSelectedColorChange} />
                                            </Col>
                                            <Col md={12} style={{ paddingRight: 30 }}>
                                                <h2>{phoneData.name}</h2>
                                                <h3 style={{ color: "#f5222d" }}>{phoneData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <span style={{ textDecoration: 'underline' }}>đ</span></h3>
                                                <h4>Màu {this.state.selectedColor.toLowerCase()}</h4>
                                                <Card style={{ width: '100%', marginBottom: 20 }}>
                                                    <h3 style={{ color: '#52c41a' }}>KHUYẾN MÃI</h3>
                                                    {phoneData.promotion?.split(';').map((promotion) =>
                                                        <p><i class="fas fa-circle" style={{ color: '#73d13d', fontSize: '0.5em' }}></i> {promotion}</p>
                                                    )}
                                                </Card>
                                                
                                                    <Button type="primary" danger style={{ width: '100%', height: 50, }} onClick={() => {
                                                        let phoneId = phoneData.phoneDtos.find((data) => data.color === this.state.selectedColor).id;
                                                        if (!this.props.cookies.cartId) {
                                                            console.log("errrrrrrrrrrrrrrrrrrrrrr")
                                                            console.log(this.props)
                                                            this.props.createNewCart(phoneId)
                                                        } else {
                                                            this.props.saveOrUpdateCartPhone(phoneId, 1)
                                                        }
                                                        
                                                    }} >
                                                        MUA NGAY
                                                    </Button>
                                                
                                                
                                            </Col>
                                        </Row>
                                    <h3>Mô tả sản phẩm</h3>
                                    <p>{ }</p>
                                    </Col>

                                <Col md={6}>
                                    <Card style={{ marginBottom: 20 }}>
                                        <h3>Sản phẩm trong hộp</h3>
                                        <p><i class="far fa-box" style={{ color: '#1890ff' }}></i> {phoneData.insideBox}</p>
                                        <p><i class="fas fa-badge-check" style={{ color: '#1890ff' }}></i> Bảo hành chính hãng {phoneData.guarantee} tháng.</p>
                                        <p><i class="fas fa-history" style={{ color: '#1890ff' }}></i> Lỗi là đổi mới trong 1 tháng tại hơn 2229 siêu thị toàn quốc</p>
                                    </Card>
                                    <Card>
                                        <h3>Thông số kỹ thuật</h3>
                                        <Row>
                                            <Col span={9}>Màn hình:</Col>
                                            <Col span={15}>{phoneData.screen}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>Hệ điều hành:</Col>
                                            <Col span={15}>{phoneData.os}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>Camera trước</Col>
                                            <Col span={15}>{phoneData.frontCamera}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>CPU</Col>
                                            <Col span={15}>{phoneData.cpu}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>Ram</Col>
                                            <Col span={15}>{phoneData.ram}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>Bộ nhớ trong</Col>
                                            <Col span={15}>{phoneData.internalMemory}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>Thẻ nhớ</Col>
                                            <Col span={15}>{phoneData.memoryStick}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>Thẻ sim</Col>
                                            <Col span={15}>{phoneData.sim}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>Dung lượng pin</Col>
                                            <Col span={15}>{phoneData.battery} mAh</Col>
                                        </Row>
                                    </Card>
                                </Col>
                                </Row>
                            </div>
                        }

                    </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
        );
    }

};

class PhoneCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let phoneData = this.props.phoneData;
        return (phoneData &&
            <Carousel showStatus={false}  onChange={(e) => this.props.onSelectedColorChange(phoneData.phoneDtos[e].color)}
            >
                {
                    phoneData.phoneDtos.map((phoneDtos) =>
                        <div style={{ background: '#fff' }}>
                            <img src={process.env.PUBLIC_URL + '/images/phones/' + phoneDtos.image}/>
                        </div>
                    )
                }
            </Carousel>
        );
    }
}

export default App;


