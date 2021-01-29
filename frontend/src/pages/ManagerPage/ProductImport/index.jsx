import React, { useEffect, useState } from "react";
import { Select, Layout, Popconfirm, message, Button, Table, Tag, Space, Form, InputNumber, DatePicker, Modal } from 'antd';
import Logo from "../../../components/Logo";
import ManagerMenu from "../../../components/ManagerMenu";
import SearchMenu from "../../../components/SearchMenu";
import moment from "moment"
var axios = require('axios');

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const validateMessages = {
    required: 'Thiếu thông tin!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};



const Home = () => {
    const [data, setData] = useState([]);
    const [importData, setImportData] = useState([]);
    const [selectedPhone, setSelectedPhone] = useState(null);
    const [selectedPhoneType, setSelectedPhoneType] = useState(null);
    const [form] = Form.useForm();
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        getDataImport();
    }, [])

    function confirm(record) {
        deleteData(record.id)
    }
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img style={{ height: 50 }} src={process.env.PUBLIC_URL + '/images/phones/' + image}></img>
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá sỉ',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Thời gian',
            dataIndex: 'created',
            key: 'created',
            render: (created) => new moment(created).format("DD/MM/YYYY")
        },
    
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <EditModal data={record} editData={editData}/>
    
                    <Popconfirm
                        title="Bạn có muốn xóa sản phẩm này?"
                        onConfirm={() => confirm(record)}
                        onCancel={() => { }}
                        okText="Đồng ý"
                        cancelText="Quay lại"
                    >
                        <Button>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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
                setData(phoneData)
            })
            .catch(function (error) {
                console.log(error);
            });
        return;
    }

    const getDataImport = () => {
        let url = 'http://localhost:8080/import';
        let config = {
            method: 'get',
            url: url,
            headers: {},
        };

        axios(config)
            .then((response) => {
                console.log("fetch...........")
                console.log(response)
                let data = response.data.map((item, index) => ({
                    ...item,
                    key: index,
                    name: item.phone.phoneType.name,
                    image: item.phone.image,
                    color: item.phone.color,
                }))
                console.log(data)
                setImportData(data)
            })
            .catch(function (error) {
                console.log(error);
            });
        return;
    }

    const postData = (data) => {
        let url = 'http://localhost:8080/import';
        let config = {
            method: 'post',
            url: url,
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                console.log("..post")
                message.success('Bạn đã thêm thành công!');
                form.resetFields()
                setSelectedPhone(null)
                setSelectedPhoneType(null)
                getDataImport();
            })
            .catch(function (error) {
                console.log(error);
            });
        return;
    }

    const editData = (data) => {
        let url = 'http://localhost:8080/import/' + data.id;
        let config = {
            method: 'put',
            url: url,
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                console.log("..put")
                message.success('Bạn đã sửa thành công!');
                getDataImport();
            })
            .catch(function (error) {
                console.log(error);
            });
        return
            ;
    }

    const deleteData = (id) => {
        let url = 'http://localhost:8080/import/' + id;
        let config = {
            method: 'delete',
            url: url,
            headers: {},
        };

        axios(config)
            .then((response) => {
                console.log("..delete")
                message.success('Bạn đã xóa thành công!');
                getDataImport();
            })
            .catch(function (error) {
                console.log(error);
            });
        return
            ;
    }


    return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Logo notLink={true} />
                    <ManagerMenu selectedKeys={["3"]} />
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 750, background: '#fff', padding: 25 }}>
                        <h2>Nhập hàng</h2>
                        <Form
                            validateMessages={validateMessages}
                            layout='inline'
                            form={form}
                            onFinish={(value) => postData(value)}
                        >
                            <Form.Item label="Tên sản phẩm" name="nameProduct" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Chọn sản phẩm"
                                    onChange={(value) => { setSelectedPhoneType(value); setSelectedPhone(null);  form.setFieldsValue({ phone:{id: null} }); }}
                                    showSearch
                                    style={{ width: 230 }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {data.map((item) => (
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
                                    {data.find((item) => item.id == selectedPhoneType)?.phones.map((item) => (
                                        <Option key={item.id} value={item.id}>{item.color}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
                                <InputNumber min={1} max={1000} />
                            </Form.Item>
                            <Form.Item name="price" label="Giá sỉ" rules={[{ required: true }]}>
                                <InputNumber
                                    min={0}
                                    max={100000000000}
                                    style={{ width: 150 }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                            <Form.Item name="created" label="Ngày nhập" rules={[{ required: true }]} initialValue={new moment()}>
                                <DatePicker format="DD/MM/YYYY" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Nhập hàng</Button>
                            </Form.Item>
                        </Form>
                        <Table dataSource={importData} columns={columns} style={{ marginTop: 15 }} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
    );
};

const EditModal = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Sửa
            </Button>
            <Modal title={props.data.name + ", " + props.data.color} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    validateMessages={validateMessages}
                    onFinish={(value) => {value.id = props.data.id; props.editData(value)}}
                    {...layout}
                >
                    <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]} initialValue={props.data.quantity}>
                        <InputNumber min={1} max={1000} />
                    </Form.Item>
                    <Form.Item name="price" label="Giá sỉ" rules={[{ required: true }]} initialValue={props.data.price}>
                        <InputNumber
                            min={0}
                            max={100000000000}
                            style={{ width: 150 }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item name="created" label="Ngày nhập" rules={[{ required: true }]} initialValue={new moment(props.data.created)}>
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>
                    <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                        <Space>
                            <Button type="primary" htmlType="submit">Sửa</Button>
                            <Button onClick={handleCancel}>Quay lại</Button>
                        </Space>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default Home;