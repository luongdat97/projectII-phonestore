import React, { Component, useEffect, useState } from "react";
import { Select, Layout, Breadcrumb, Carousel, Row, Col, Card, Rate, Tooltip, Radio, Checkbox, Button, Table, Tag, Space, Modal, Form, Input, InputNumber, Divider, message } from 'antd';
import Logo from "../../../components/Logo";
import EmployeeMenu from "../../../components/EmployeeMenu";
import SearchMenu from "../../../components/SearchMenu";
import axios from 'axios'
import moment from 'moment'
import { useCookies } from 'react-cookie';
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Meta } = Card;
const columns = [
    {
        title: 'Mã hóa đơn',
        dataIndex: 'invoiceId',
        key: 'invoiceId',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        key: 'customer',
    },
    {
        title: 'Nhân viên',
        dataIndex: 'employee',
        key: 'employee',
    },
    {
        title: 'Ngày tạo',
        key: 'date',
        dataIndex: 'date',
    },
    {
        title: 'Tổng cộng',
        key: 'totalMoney',
        dataIndex: 'totalMoney',
        render: data => data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    {
        title: 'Hành động',
        key: 'action',
        render: (order, record) => <OrderDetail data={record} action={false}></OrderDetail>,
    },
];

const Home = () => {
    const [phoneData, setPhoneData] = useState([])
    const [listInvoice, setListInvoice] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const user = cookies.user;
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchInvoice();
    }, [])
    const fetchData = () => {
        let url = 'http://localhost:8080/phone-detail';
        let config = {
            method: 'get',
            url: url,
            headers: {},
        };

        axios(config)
            .then((response) => {
                let phoneData = response.data.map((item) => ({ key: item.id, ...item }))
                setPhoneData(phoneData)
            })
            .catch(function (error) {
                console.log(error);
            });
        return;
    }

    const fetchInvoice = () => {
        let url = 'http://localhost:8080/order/invoice';
        let config = {
            method: 'get',
            url: url,
        };

        axios(config)
            .then((response) => {
                let invoices = response.data.map((data, index) => {
                    console.log("data..............")
                    console.log(data)
                    let totalMoney = 0;
                    let invoiceLine = data.orderPhones;
                    invoiceLine.map(data => totalMoney += data.quantity *data.phone.phoneType.price)
                    return ({
                        invoiceId: data.id,
                        key: index,
                        order: data.id,
                        phoneNumber: data.customer.phoneNumber,
                        address: data.address,
                        customer: data.customer.name,
                        date: new moment(data.created).format('HH:mm:ss DD/MM/YYYY'),
                        totalMoney: totalMoney,
                        state: data.state,
                        detail: data,
                        orderMethod: data.orderMethod,
                        id: data.id,
                        employee: data.staff?.name
                    })
                })
                setListInvoice(invoices)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Logo notLink={true} />
                    <EmployeeMenu selectedKeys={["1"]} />
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 750, background: '#fff', padding: 25 }}>
                        <h2>Quản lý hóa đơn</h2>
                        <InvoiceCreate phoneData={phoneData} user={user} fetchInvoice={fetchInvoice}></InvoiceCreate>
                        <Table dataSource={listInvoice} columns={columns} style={{ marginTop: 15 }} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
    );
};

const InvoiceCreate = (props) => {
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
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Tạo hóa đơn
              </Button>
            <Modal
                title="Tạo hóa đơn"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={null}
            >
                <FormInvoice phoneData={props.phoneData} handleCancel={handleCancel} user={props.user} fetchInvoice={props.fetchInvoice}></FormInvoice>
            </Modal>
        </>
    );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: 'Thiếu ${label}!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const FormInvoice = (props) => {
    const [selectedPhone, setSelectedPhone] = useState(null);
    const [selectedPhoneType, setSelectedPhoneType] = useState(null);
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [formProduct] = Form.useForm();
    const [formUser] = Form.useForm();

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const user = cookies.user;

    const resetData = () => {
        setSelectedPhoneType(null)
        setSelectedPhone(null)
        setInvoiceItems([])
        formProduct.resetFields()
        formUser.resetFields()
    }

    const postOrder = (data) => {
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
            props.handleCancel()
            props.fetchInvoice()
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    const addItem = (phoneTypeId, phoneId, quantity) => {
        let newInvoiceItems = [...invoiceItems];
        let index = newInvoiceItems.findIndex(item => item.phoneId == phoneId)
        if (index === -1) {
            newInvoiceItems.push({ phoneTypeId, phoneId, quantity })
        } else {
            newInvoiceItems[index].quantity += quantity;
        }
        setInvoiceItems(newInvoiceItems)
    }

    const deleteItem = (index) => {
        let newInvoiceItems = [...invoiceItems];
        newInvoiceItems.splice(index, 1);
        setInvoiceItems(newInvoiceItems)
    }

    const onFinish = values => {
        console.log(values);
        if (invoiceItems.length === 0) {
            message.error("Bạn chưa thêm sản phẩm nào vào hóa đơn!")
            return
        }

        let customer = values.customer

        let orderPhones = invoiceItems.map((item) => ({
        phone: { id: item.phoneId },
        quantity: item.quantity,
        }))

        let address = null;
        let store = null;
        let orderMethod = 0

        let order = {
        orderMethod: orderMethod,
        paymentMethod: 1,
        address: address,
        store: store,
        orderPhones: orderPhones,
        state: 3,
        staff: {id: user.id}
        }
        let data = {
        customer: customer,
        order: order,
        cartId: null
        }
        console.log(data)
        postOrder(data)
    };
    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (data) => data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        {
            title: 'Tạm tính',
            key: 'money',
            render: (data, record) => (record.quantity * record.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" danger onClick={() => deleteItem(record.key)}>Xóa</Button>
            ),
        },
    ];
    let total = 0;
    const data = invoiceItems.map((item, index) => {
        const phoneType = props.phoneData.find((typeItem) => item.phoneTypeId == typeItem.id)
        total += phoneType.price * item.quantity
        return ({
            key: index,
            name: phoneType.name + ", " + phoneType.phones.find(phone => item.id = phone.id).color,
            quantity: item.quantity,
            price: phoneType.price,
        })
    })

    return (
        <>
            <Form form={formUser} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Space direction="vertical" style={{ width: 600 }}>
                    <Row>
                        <Col span={6} style={{ fontWeight: 'bold' }}>Ngày:</Col>
                        <Col span={18}>{new moment().format("DD/MM/YYYY")}</Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ fontWeight: 'bold' }}>Đơn vị bán:</Col>
                        <Col span={18}>Cửa hàng điện thoại Bphone</Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ fontWeight: 'bold' }}>Địa chỉ:</Col>
                        <Col span={18}>số 25, Thanh Xuân, Hà Nội</Col>
                    </Row>
                    <Row>
                        <Col span={6} style={{ fontWeight: 'bold' }}>Nhân viên bán hàng:</Col>
                        <Col span={18}>{props.user.name}</Col>
                    </Row>
                </Space>
                <Divider></Divider>
                <h4>Thông tin khách hàng</h4>
                <div style={{ width: 600 }}>
                    <Form.Item name={['customer', 'name']} label="Họ tên" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['customer', 'email']} label="Email" rules={[{ type: 'email' }, { required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['customer', 'phoneNumber']} label="Số điện thoại" rules={[{ type: 'pattern', pattern: '0[35789][0-9]{8}$' }, { required: true }]}>
                        <Input />
                    </Form.Item>
                </div>
            </Form>

            <Form
                validateMessages={validateMessages}
                layout='inline'
                form={formProduct}
                onFinish={(value) => {addItem(value.phoneType, value.phone.id, value.quantity);formProduct.resetFields();}}
            >
                <Form.Item label="Tên sản phẩm" name="phoneType" rules={[{ required: true }]}>
                    <Select
                        placeholder="Chọn sản phẩm"
                        onChange={(value) => { setSelectedPhoneType(value); setSelectedPhone(null); formProduct.setFieldsValue({ phone: { id: null } }); }}
                        showSearch
                        style={{ width: 230 }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {props.phoneData.map((item) => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Màu sắc" name={["phone", "id"]} rules={[{ required: true }]}>
                    <Select
                        onChange={(value) => setSelectedPhone(value)}
                        style={{ width: 100 }}
                        placeholder="Chọn màu sắc"
                    >
                        {props.phoneData.find((item) => item.id == selectedPhoneType)?.phones.map((item) => (
                            <Option key={item.id} value={item.id}>{item.color}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
                    <InputNumber min={1} max={1000} />
                </Form.Item>
                <Button type='primary' htmlType="submit">Thêm sản phẩm</Button>
            </Form>

            <Table dataSource={data} columns={columns} />
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Tổng tiền : </span><span style={{ color: '#f5222d' }}> {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                </div>            
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                <Space>
                    <Button onClick={props.handleCancel}>Quay lại</Button>
                    <Button onClick={resetData}>Đặt lại dữ liệu</Button>
                    <Button type="primary" onClick={() => formUser.submit()}>Tạo hóa đơn</Button>           
                </Space>                    
            </div>
        </>
    );


};
export default Home;

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

    return (
        <>
            <Button type="primary" ghost onClick={showModal}>
                Xem chi tiết
              </Button>
            <Modal
                title="Hóa đơn"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={null}
            >
                <Space direction="vertical" style={{ width: 600 }}>
                    <Row>
                        <Col span={6}>Ngày:</Col>
                        <Col span={18}>{new moment(order.created).format("DD/MM/YYYY")}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Đơn vị bán:</Col>
                        <Col span={18}>Cửa hàng điện thoại Bphone</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Địa chỉ:</Col>
                        <Col span={18}>số 25, Thanh Xuân, Hà Nội</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Nhân viên bán hàng:</Col>
                        <Col span={18}>{order.staff?.name}</Col>
                    </Row>
                </Space>

                <h3 style={{marginTop: 20}}>Thông tin khách hàng</h3>
                <Space direction="vertical" style={{ width: 600 }}>
                    <Row>
                        <Col span={6}>Họ tên:</Col>
                        <Col span={18}>{customer.name}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Email:</Col>
                        <Col span={18}>{customer.email}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Số điện thoại:</Col>
                        <Col span={18}>{customer.phoneNumber}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>Địa chỉ giao hàng:</Col>
                        <Col span={18}>{props.data.detail.address}</Col>
                    </Row>
                </Space>
                
                <h3 style={{ paddingTop: 20 }}>Đơn hàng</h3>

                <Table dataSource={data} columns={columns} pagination={false} ></Table>

                <div style={{ padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
                    <h4>Thành tiền: {countTotal(props.data.detail).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</h4>
                </div>
            </Modal>
        </>
    );
}
