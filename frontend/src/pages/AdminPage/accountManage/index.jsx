import React, { Component, useEffect, useState } from "react";
import { Select, Layout, Menu, Breadcrumb, Carousel, Row, Col, Card, Rate, Popconfirm, notification, DatePicker, Button, Table, Tag, Space, Modal, Form, Input, InputNumber, Divider, message } from 'antd';
import Logo from "../../../components/Logo";
import ManagerMenu from "../../../components/ManagerMenu";
import SearchMenu from "../../../components/SearchMenu";
import moment from 'moment';
var axios = require('axios');
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Meta } = Card;

const Home = () => {
    const [staffs, setStaffs] = useState([])
    const [dataChange, setDataChange] = useState(false);

    useEffect(() => {
        getAllStaff();
    }, [dataChange]);

    const confirmDisableAcc = (staff) => {
        putStaff(staff.id, 0, staff.username)
    }

    const confirmEnableAcc = (staff) => {
        putStaff(staff.id, 1, staff.username)
    }

    const confirmResetPass = (staff) => {
        changeStaffPass(staff, Math.random().toString(36).slice(-8))
        
    }

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (data) => new moment(data).format('DD/MM/YYYY'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Vai trò',
            key: 'role',
            dataIndex: 'role',
            render: (data) => {
                if (data.id == 1) return 'Admin'
                if (data.id == 2) return 'Quản lý'
                if (data.id == 3) return 'Nhân viên'
            }
        },
        {
            title: 'Tên đăng nhập',
            key: 'username',
            dataIndex: 'username',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <AccountEdit data={record} setDataChange={setDataChange}/>
                    <Popconfirm
                        title="Bạn đồng ý đặt lại mật khẩu tài khoản này?"
                        onConfirm={(e) => confirmResetPass(record)}
                        okText="Đồng ý"
                        cancelText="Quay lại"
                    >
                        <Button>Đặt lại mật khẩu</Button>
                    </Popconfirm>              
                    {
                        record.active == 1 &&
                        <Popconfirm
                            title="Bạn đồng ý khóa tài khoản này?"
                            onConfirm={(e) => confirmDisableAcc(record)}
                            okText="Đồng ý"
                            cancelText="Quay lại"
                        >
                            <Button type='primary' danger>Khóa tài khoản</Button>
                        </Popconfirm>
                    }
                    
                    {
                        record.active == 0 &&
                        <Popconfirm
                            title="Bạn đồng ý mở khóa tài khoản này?"
                            onConfirm={(e) => confirmEnableAcc(record)}
                            okText="Đồng ý"
                            cancelText="Quay lại"
                        >
                            <Button type='primary' ghost>Mở khóa tài khoản</Button>
                        </Popconfirm>
                    }                
                </Space>
            ),
        },
    ];
    const getAllStaff = () => {
        let url = 'http://localhost:8080/staff/';
        let config = {
            method: 'get',
            url: url,
            headers: {},
        };

        axios(config)
            .then((response) => {
                response.data.map((data,index) => ({
                    key: index,
                    ...data
                }))
                setStaffs(response.data)
                setDataChange(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const putStaff = (id, state, username) => {
        let url = 'http://localhost:8080/staff/' + id + '/change-state';
        let config = {
            method: 'put',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: state
        };

        axios(config)
            .then((response) => {
                if (response.data) {
                    let mess
                    if (state == 0) mess = 'Bạn đã vô hiệu hóa tài khoản ' + username;
                    if (state == 1) mess = 'Bạn đã mở khóa tài khoản ' + username; 
                    setDataChange(true)
                    message.success(mess)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const changeStaffPass = (staff, newPass) => {
        let url = 'http://localhost:8080/staff/' + staff.id + '/reset-password';
        let config = {
            method: 'put',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: newPass
        };

        axios(config)
            .then((response) => {
                if (response.data) {
                    setDataChange(true)
                    notification['success']({
                        message: 'Đặt lại mật khẩu',
                        description:
                        'Bạn đã đặt lại mật khẩu cho tài khoản ' + staff.username +' là: ' + newPass,
                        duration: 1000,
                      });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Logo notLink={true} />
                    <ManagerMenu selectedKeys={["1"]} />
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 750, background: '#fff', padding: 25 }}>
                        <h2>Quản lý tài khoản</h2>
                        <AccountCreate setDataChange={setDataChange}></AccountCreate>
                        <Table dataSource={staffs} columns={columns} style={{ marginTop: 15 }} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
    );
};

class AccountCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        }
    }
    setIsModalVisible = (visible) => {
        this.setState({ isModalVisible: visible });
    }

    showModal = () => {
        this.setIsModalVisible(true);
    };

    handleOk = () => {
        this.setIsModalVisible(false);
    };

    handleCancel = () => {
        this.setIsModalVisible(false);
    };
    render() {
        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    Tạo tài khoản
              </Button>
                <Modal
                    title="Tạo tài khoản"
                    visible={this.state.isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={650}
                    footer={null}
                >
                    <FormCreateAccount handleCancel={this.handleCancel} setDataChange={this.props.setDataChange}></FormCreateAccount>
                </Modal>
            </>
        );
    }
}
const AccountEdit = (props) => {
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
                Sửa
              </Button>
            <Modal
                title="Sửa thông tin"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={650}
                footer={null}
            >
                <FormEditAccount data={props.data} setDataChange={props.setDataChange} handleCancel={handleCancel}></FormEditAccount>
            </Modal>
        </>
    );

}

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

const validateMessages = {
    required: 'Chưa nhập thông tin!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    pattern: {
        mismatch: "${label} không hợp lệ !",
    },
};

const FormEditAccount = (props) => {
    const editStaff = (staff) => {
        let url = 'http://localhost:8080/staff/' + staff.id;
        console.log('...................url')
        console.log(url)
        let config = {
            method: 'put',
            url: url,
            headers: {},
            data: staff
        };

        axios(config)
            .then((response) => {
                if (response.data) {
                    message.success('Bạn đã thay đổi thông tin!')
                    props.setDataChange(true)
                } else {
                    message.error('Có lỗi xảy ra!')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onFinish = values => {
        
        if (isNaN(values.account.role.id)) values.account.role.id = props.data.role.id
        values.account.id = props.data.id
        console.log("..............submit")
        console.log(values);
        editStaff(values.account)
    };
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    let staff = props.data
    let account = {
        id: staff.id,
        key: staff.key,
        name: staff.name,
        birthday: new moment(staff.birthday),
        phoneNumber: staff.phoneNumber,
        address: staff.address,
        email: staff.email,
        role: {id: staff.role.id==1? "quản trị viên": staff.role.id==2? 'quản lý' : 'nhân viên'},
        username: staff.username,
    }

    console.log("..................data")
    console.log(props.data)
    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues={{ account: account }}>
            <div style={{ width: '100%' }}>
                <Form.Item name={['account', 'name']} label="Họ tên" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'birthday']} label="Ngày sinh">
                    <DatePicker />
                </Form.Item>
                <Form.Item name={['account', 'phoneNumber']} label="Số điện thoại" rules={[{ type: 'pattern', pattern: '0[35789][0-9]{8}$' }, { required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'address']} label="Địa chỉ">
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'role', 'id']} label="Vai trò" rules={[{ required: true }]}>
                    <Select defaultValue={account.role.id} style={{ width: 120 }}>
                        <Option value="1">quản trị viên</Option>
                        <Option value="2">quản lý</Option>
                        <Option value="3">nhân viên</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['account', 'username']} label="Tên đăng nhập" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Space>
                        <Button key="back" onClick={props.handleCancel}>
                            quay lại
                            </Button>
                        <Button key="submit" type="primary" htmlType="submit">
                            Sửa tài khoản
                            </Button>
                    </Space>

                </div>

            </div>
        </Form>
    );

};

const FormCreateAccount = (props) => {
    const [form] = Form.useForm();

    const onFinish = values => {
        //values.account.birthday = values.account.birthday?.toString()
        values.account.active = 1;
        console.log(values);
        postStaff(values.account)

    };

    const onReset = () => {
        form.resetFields();
    };

    const postStaff = (staff) => {
        let url = 'http://localhost:8080/staff/';
        let config = {
            method: 'post',
            url: url,
            headers: {},
            data: staff
        };

        axios(config)
            .then((response) => {
                if (response.data) {
                    message.success('Bạn đã tạo tài khoàn thành công!')
                    props.setDataChange(true)
                } else {
                    message.error('Tên đăng nhập đã tồn tại!')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <div style={{ width: '100%' }}>
                <Form.Item name={['account', 'name']} label="Họ tên" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'birthday']} label="Ngày sinh">
                    <DatePicker />
                </Form.Item>
                <Form.Item name={['account', 'phoneNumber']} label="Số điện thoại" rules={[{ type: 'pattern', pattern: '0[35789][0-9]{8}$' }, { required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'address']} label="Địa chỉ">
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'role', 'id']} label="Vai trò" rules={[{ required: true }]} initialValue="1">
                    <Select defaultValue="1" style={{ width: 120 }}>
                        <Option value="1">quản trị viên</Option>
                        <Option value="2">quản lý</Option>
                        <Option value="3">nhân viên</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['account', 'username']} label="Tên đăng nhập" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['account', 'password']} label="Mật khẩu" rules={[{ required: true }]}>
                    <Input.Password addonAfter={<Button type="text" size="small" onClick={() => form.setFieldsValue({ account: { password: Math.random().toString(36).slice(-8) } })}>Tạo tự động</Button>} />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Space>
                        <Button key="back" onClick={props.handleCancel}>
                            quay lại
                            </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                            </Button>
                        <Button key="submit" type="primary" htmlType="submit">
                            Tạo tài khoản
                            </Button>
                    </Space>

                </div>

            </div>
        </Form>
    );

};
export default Home;
