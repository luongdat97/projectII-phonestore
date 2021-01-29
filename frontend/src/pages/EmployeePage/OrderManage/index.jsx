import React, { Component, useEffect, useState } from "react";
import { Select, Layout, Row, Col, Card, Badge, Radio, Button, Table, Space, Modal, Popconfirm, message } from 'antd';
import Logo from "../../../components/Logo";
import EmployeeMenu from "../../../components/EmployeeMenu";
import SearchMenu from "../../../components/SearchMenu";
import moment from 'moment';
import { useCookies } from 'react-cookie';
var axios = require('axios');
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Meta } = Card;


const OrderManage = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const user = cookies.user;
    const [tableShow, setTableShow] = useState(0)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const updateOrder = (order) => {
        let url = 'http://localhost:8080/order/' + order.id;
        let config = {
            method: 'put',
            url: url,
            headers: {},
            data: order
        };

        axios(config)
            .then((response) => {
                let newOrders = [...orders];
                let index = newOrders.findIndex((data) => { return data.id == order.id })
                newOrders[index].state = order.state
                setOrders(newOrders)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const fetchData = () => {
        let url = 'http://localhost:8080/order';
        let config = {
            method: 'get',
            url: url,
        };

        axios(config)
            .then((response) => {
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
                    id: data.id

                }))
                setOrders(orders);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    let newOrder = orders.filter(order => (order.state == 0 && order.orderMethod == 1))
    let waitShipOrder = orders.filter(order => (order.state == 1 && order.orderMethod == 1))
    let onShippingTable = orders.filter(order => (order.state == 2 && order.orderMethod == 1))
    let shippedTable = orders.filter(order => (order.state == 3 && order.orderMethod == 1))
    let failTable = orders.filter(order => (order.state == 4 && order.orderMethod == 1))
    let boomOrderTable = orders.filter(order => (order.state == 5 && order.orderMethod == 1))

    return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Logo  notLink={true}/>
                    <EmployeeMenu  selectedKeys={["2"]}/>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 750, background: '#fff', padding: 25 }}>
                        <h2>Tiếp nhận đơn hàng</h2>
                        <Radio.Group defaultValue={0} buttonStyle="solid" onChange={(e) => { setTableShow(e.target.value) }}>
                            <Badge count={newOrder.length} offset={[-10, 0]}>
                                <Radio.Button value={0}>Đơn hàng mới</Radio.Button>
                            </Badge>
                            <Badge count={waitShipOrder.length} offset={[-10, 0]}>
                                <Radio.Button value={1}>Đơn hàng chờ được ship</Radio.Button>
                            </Badge>
                            <Badge count={onShippingTable.length} offset={[-10, 0]}>
                                <Radio.Button value={2}>Đơn hàng đang ship</Radio.Button>
                            </Badge>

                            <Radio.Button value={3}>Đơn hàng đã giao</Radio.Button>
                            <Radio.Button value={4}>Đơn hàng bị hủy</Radio.Button>
                            <Radio.Button value={5}>Đơn hàng bị trả lại</Radio.Button>
                        </Radio.Group>
                        <div style={{ marginTop: 15, display: tableShow == 0 ? "block" : "none" }} ><NewOrderTable data={newOrder} updateOrder={updateOrder} /></div>
                        <div style={{ marginTop: 15, display: tableShow == 1 ? "block" : "none" }} ><WaitShipTable data={waitShipOrder} updateOrder={updateOrder} /></div>
                        <div style={{ marginTop: 15, display: tableShow == 2 ? "block" : "none" }} ><OnShippingTable data={onShippingTable} updateOrder={updateOrder} user={user}/></div>
                        <div style={{ marginTop: 15, display: tableShow == 3 ? "block" : "none" }} ><GeneralTable data={shippedTable} /></div>
                        <div style={{ marginTop: 15, display: tableShow == 4 ? "block" : "none" }} ><GeneralTable data={failTable} /></div>
                        <div style={{ marginTop: 15, display: tableShow == 5 ? "block" : "none" }} ><GeneralTable data={boomOrderTable} /></div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
    );


};

const NewOrderTable = (props) => {
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order',
            key: 'order',

        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Thời gian tạo đơn',
            key: 'date',
            dataIndex: 'date',
        },
        {
            title: 'Chi tiết đơn hàng',
            key: 'action',
            render: (order, record) => <OrderDetail data={record} updateOrder={props.updateOrder}></OrderDetail>,
        },
    ];

    return (
        <Table dataSource={props.data} columns={columns} />
    );
}


const WaitShipTable = (props) => {
    const confirm = (e, state, orderId) => {
        let action
        if (state == 4) action = 'hủy đơn'
        if (state == 2) action = 'Giao hàng'
        props.updateOrder({ id: orderId, state: state })
        message.success('Bạn đã ' + action + " thành công!");
    }
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order',
            key: 'order',

        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Thời gian tạo đơn',
            key: 'date',
            dataIndex: 'date',
        },
        {
            title: '',
            key: 'action',
            render: (order, record) => {
                return (
                    <Space>
                        <Popconfirm
                            title="Bạn đồng ý giao đơn hàng này?"
                            onConfirm={(e) => confirm(e, 2, record.id)}
                            okText="Đồng ý"
                            cancelText="không"
                        >
                            <Button type={"primary"} >Giao hàng</Button>
                        </Popconfirm>

                        <Popconfirm
                            title="Xác nhận hủy đơn hàng?"
                            onConfirm={(e) => confirm(e, 4, record.id)}
                            okText="Đồng ý"
                            cancelText="không"
                        >
                            <Button type={"primary"} danger>Hủy đơn</Button>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ];

    return (
        <Table dataSource={props.data} columns={columns} />
    );
}

const OnShippingTable = (props) => {
    const confirm = (e, state, orderId) => {
        
        let action
        if (state == 5) action = 'đơn hàng bị giao thất bại'
        if (state == 3) action = 'đơn hàng được giao đến khách'
        props.updateOrder({ id: orderId, state: state, staff: {id: props.user.id} })
        message.success('Bạn đã xác nhận ' + action);
    }
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order',
            key: 'order',

        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Thời gian tạo đơn',
            key: 'date',
            dataIndex: 'date',
        },
        {
            title: '',
            key: 'action',
            render: (order, record) => {
                return (
                    <Space>
                        <Popconfirm
                            title="Xác nhận đã giao hàng?"
                            onConfirm={(e) => confirm(e, 3, record.id)}
                            okText="Đồng ý"
                            cancelText="không"
                        >
                            <Button type={"primary"} >Đã giao hàng</Button>
                        </Popconfirm>

                        <Popconfirm
                            title="Xác nhận giao đơn hàng thất bại?"
                            onConfirm={(e) => confirm(e, 5, record.id)}
                            okText="Đồng ý"
                            cancelText="không"
                        >
                            <Button type={"primary"} danger>Giao thất bại</Button>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ];

    return (
        <Table dataSource={props.data} columns={columns} />
    );
}

const GeneralTable = (props) => {
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order',
            key: 'order',

        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Thời gian tạo đơn',
            key: 'date',
            dataIndex: 'date',
        },
        {
            title: 'Chi tiết đơn hàng',
            key: 'action',
            render: (order, record) => <OrderDetail data={record} updateOrder={props.updateOrder} action={false}></OrderDetail>,
        },
    ];

    return (
        <Table dataSource={props.data} columns={columns} />
    );
}


export default OrderManage;


const OrderDetail = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false)


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const countTotal = (order) => {
        let total = 0;
        order.orderPhones.map((item) => { total += item.quantity * item.phone.phoneType.price })
        return total
    }

    let customer = props.data.detail.customer
    let cart = props.data.detail.orderPhones

    let data = props.data.detail.orderPhones.map((item, index) => ({
        key: index,
        name: item.phone.phoneType.name + ', ' + item.phone.color,
        quantity: item.quantity,
        price: item.phone.phoneType.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        total: (item.quantity * item.phone.phoneType.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    }))

    let order = props.data.detail

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

    const confirm = (e, value) => {
        let action
        if (value == 4) action = 'hủy đơn'
        if (value == 1) action = 'nhận đơn'
        props.updateOrder({ id: order.id, state: value })
        setIsModalVisible(false);
        message.success('Bạn đã ' + action + " thành công!");
    }

    return (
        <>
            <Button type="primary" ghost onClick={showModal}>
                Xem chi tiết
              </Button>
            <Modal
                title="Đơn hàng"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={null}
            >

                <h3>1. Thông tin khách hàng</h3>

                <Row>
                    <Col span={4}>Họ tên:</Col>
                    <Col span={4}>{customer.name}</Col>
                </Row>
                <Row>
                    <Col span={4}>Email:</Col>
                    <Col span={4}>{customer.email}</Col>
                </Row>
                <Row>
                    <Col span={4}>Số điện thoại:</Col>
                    <Col span={4}>{customer.phoneNumber}</Col>
                </Row>
                <Row>
                    <Col span={4}>Địa chỉ giao hàng:</Col>
                    <Col span={4}>{props.data.detail.address}</Col>
                </Row>
                <h3 style={{ paddingTop: 20 }}>2. Đơn hàng</h3>

                <Table dataSource={data} columns={columns} pagination={false} ></Table>

                <div style={{ padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
                    <h4>Thành tiền: {countTotal(props.data.detail).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</h4>
                </div>

                {props.action !== false &&
                    <div style={{ padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
                        <Space>
                            <Popconfirm
                                title="Bạn đồng ý nhận đơn hàng này?"
                                onConfirm={(e) => confirm(e, 1)}
                                okText="Đồng ý"
                                cancelText="không"
                            >
                                <Button type={"primary"} >Nhận đơn</Button>
                            </Popconfirm>

                            <Popconfirm
                                title="Bạn đồng ý hủy đơn hàng này?"
                                onConfirm={(e) => confirm(e, 4)}
                                okText="Đồng ý"
                                cancelText="không"
                            >
                                <Button type={"primary"} danger>Hủy đơn</Button>
                            </Popconfirm>

                            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                        </Space>
                    </div>
                }
                

            </Modal>
        </>
    );
}
