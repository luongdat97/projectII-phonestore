import React, { Component, useEffect, useState } from "react";
import { Select, Layout, Menu, Breadcrumb, Carousel, Row, Col, Card, Rate, Popconfirm, notification, DatePicker, Button, Table, Tag, Space, Modal, Form, Input, InputNumber, Divider, message } from 'antd';
import Logo from "../../components/Logo";
import ManagerMenu from "../../components/ManagerMenu";
import EmployeeMenu from "../../components/EmployeeMenu"
import SearchMenu from "../../components/SearchMenu";
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { Typography } from 'antd';
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
                    {(user.role.id == 1 || user.role.id == 2) && <ManagerMenu selectedKeys={["5"]} />}
                    {user.role.id == 3 && <EmployeeMenu selectedKeys={["4"]} />}
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 750, background: '#fff', padding: 25 }}>
                        
                        <Title level={3}>Thông tin cá nhân</Title>
                        <Row style={{marginTop: 50}}>
                            <Col><i class="fad fa-user-tie" style={{fontSize: '17em', color: '#002766'}}></i></Col>
                            <Col style={{paddingLeft: 120}}>
                                <Space direction="vertical" size="middle" style={{width: 700}}>
                                    <Row>
                                        <Col span={6}>Họ tên:</Col>
                                        <Col>{user.name}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Ngày sinh:</Col>
                                        <Col>{new moment(user.birthday).format("DD/MM/YYYY")}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Số điện thoại:</Col>
                                        <Col>{user.phoneNumber}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Địa chỉ:</Col>
                                        <Col>{user.address}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Email:</Col>
                                        <Col>{user.email}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Vai trò:</Col>
                                        <Col>{user.role.name}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Tên đăng nhập:</Col>
                                        <Col>{user.username}</Col>
                                    </Row>
                                </Space>
                            </Col>
                        </Row>
                        
                        

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
    );
};

export default Home;
