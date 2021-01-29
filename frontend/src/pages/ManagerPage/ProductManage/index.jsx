import React, { Component, useEffect, useState } from "react";
import { Select, Layout, DatePicker, Popconfirm, message, Row, Col, Card, Upload, Tooltip, Radio, Checkbox, Button, Table, Tag, Space, Modal, Form, Input, InputNumber, Divider } from 'antd';
import Logo from "../../../components/Logo";
import ManagerMenu from "../../../components/ManagerMenu";
import SearchMenu from "../../../components/SearchMenu";
import { UploadOutlined, InboxOutlined, LoadingOutlined, PlusOutlined, MinusCircleOutlined, } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
var axios = require('axios');

const normFile = e => {
    console.log('Upload event:..................,', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Meta } = Card;



const Home = () => {
    const[phones, setPhones] = useState([])
    const [fetchNewData, setFetchNewData] = useState(true);
    useEffect(() => {
        if (fetchNewData) fetchData();
    },[fetchNewData]);
    const fetchData = () => {
        let url = 'http://localhost:8080/phone/not-filter';
          let config = {
            method: 'get',
            url: url,
            headers: {},
          };
    
          axios(config)
            .then((response) => {
                let phoneData = response.data.map((item) => ({key: item.id, ...item}))
                setPhones(phoneData)
                setFetchNewData(false)
            })
            .catch(function (error) {
              console.log(error);
            });
            return;
    }
    const deleteData = (phoneTypeId) => {
        let url = 'http://localhost:8080/phone-type/' + phoneTypeId;
          let config = {
            method: 'delete',
            url: url,
            headers: {},
          };
    
          axios(config)
            .then((response) => {
                setFetchNewData(true)
                message.success('Bạn đã xóa thành công!');
            })
            .catch(function (error) {
              console.log(error);
            });
            return;
    }
    const confirm = (phoneTypeId) => {
        deleteData(phoneTypeId)
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
            render: (image) => <img style={{height: 50}} src={process.env.PUBLIC_URL + '/images/phones/' + image}></img>
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        {
            title: 'Màn hình',
            dataIndex: 'screenSize',
            key: 'screenSize',
        },
        {
            title: 'Hệ điều hành',
            key: 'os',
            dataIndex: 'os',
        },
        {
            title: 'Dung lượng pin',
            key: 'battery',
            dataIndex: 'battery',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <ProductEdit />
                    <Popconfirm
                    title="Bạn có muốn xóa sản phẩm này?"
                    onConfirm={() => confirm(record.id)}
                    okText="Đồng ý"
                    cancelText="Quay lại"
                >
                    <Button danger>Xóa</Button>
                </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Logo notLink={true} />
                    <ManagerMenu selectedKeys={["2"]}/>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 750, background: '#fff', padding: 25 }}>
                        <h2>Quản lý sản phẩm</h2>
                        <ProductCreate setFetchNewData={setFetchNewData}></ProductCreate>
                        <Table dataSource={phones} columns={columns} style={{ marginTop: 15 }} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
    );
};

const ProductCreate = (props) => {
    
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
                    Tạo sản phẩm
              </Button>
                <Modal
                    title="Tạo sản phẩm"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1000}
                    footer={null}
                >
                    <FormCreateProduct setFetchNewData={props.setFetchNewData}></FormCreateProduct>
                </Modal>
            </>
        );
    
}
class ProductEdit extends React.Component {
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
                    Sửa
              </Button>
                <Modal
                    title="Sửa thông tin"
                    visible={this.state.isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1000}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            quay lại
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Sửa
                        </Button>,
                    ]}
                >
                    <FormEditProduct></FormEditProduct>
                </Modal>
            </>
        );
    }
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const figureLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

class FormCreateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: null
        }
    }

    setFileList = (fileList) => {
        this.setState({fileList})
    }

    postPhoneType = (value) => {
        let url = 'http://localhost:8080/phone-type';
    
        let config = {
          method: 'post',
          url: url,
          data: value
        };
    
        axios(config)
          .then((response) => {
            console.log("haha...................")
            console.log(response)
            message.success("Bạn đã thêm sản phẩm thành công")
            this.props.setFetchNewData(true)
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    onFinish = values => {
        console.log("finish................")
        let formData = new FormData()
        values.createPhoneDtos = values.createPhoneDtos.filter((data) => data.color !== undefined)
        values.createPhoneDtos = values.createPhoneDtos?.map((data, index) => {
            formData.append('files', data.image[0].originFileObj)
            console.log(data.image[0].originFileObj)
            return {color: data.color, image: null}
            
        })
        

        axios.post('http://localhost:8080/phone-type-file', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
            console.log("haha.............")
            console.log(response)
            let imageUrls = response.data;
            imageUrls.map((url, index) => {
                values.createPhoneDtos[index].image = url;
            })
            
            console.log(values);
            this.postPhoneType(values)
            })
            .catch(function (error) {
                console.log(error);
            });
        
        
        //this.postPhoneType(values, formData)
    };

    onChange = ({ fileList: newFileList }) => {
        this.setFileList(newFileList);
    };

    onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    render() {
        const product = {
            key: '1',
            name: 'Lương Mạnh Đạt',
            birthday: '30/1/1997',
            phoneNumber: '0981988988',
            address: 'Vĩnh Tường, Vĩnh Phúc',
            email: 'luongdat97@gmail.com',
            role: 'Admin',
            username: 'datlm',
        }
        return (
            <Form {...layout}  name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} initialValues={{ product: product }}>
                <div style={{ width: '100%' }}>
                    <Form.Item name={['name']} label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['price']} label="Giá" rules={[{ required: true }]}>
                        <InputNumber
                            min={0}
                            max={100000000000}
                            style={{ width: 150 }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item name={['brand']} label="Thương hiệu" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }}>
                            <Option value="Iphone">Iphone</Option>
                            <Option value="Oppo">Oppo</Option>
                            <Option value="Realme">Realme</Option>
                            <Option value="Huawei">Huawei</Option>
                            <Option value="Samsung">Samsung</Option>
                            <Option value="Vsmart">Vsmart</Option>
                            <Option value="Vivo">Vivo</Option>
                            <Option value="Nokia">Nokia</Option>                            
                        </Select>
                    </Form.Item>
                    <Form.Item name={['release']} label="Ngày ra mắt" rules={[{ required: true }]} >
                        <DatePicker/>
                    </Form.Item>
                    <Row>
                        <Col span={20} offset={4}>
                            <Form.List name="createPhoneDtos"> 
                                {(fields, { add, remove }) => (
                                <>
                                    {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'image']}
                                            fieldKey={[field.fieldKey, 'image']}
                                            rules={[{ required: true, message: 'Missing image' }]}
                                            getValueFromEvent={normFile}
                                            style={{width: 104, height: 104, overflow: 'hidden'}}
                                        >
                                            
                                                <Upload
                                                
                                                    listType="picture-card"
                                                    onPreview={this.onPreview}
                                                    
                                                    beforeUpload={() => {return false}}
                                                >
                                                    + Upload
                                                </Upload>
                                        
                                        
                                        </Form.Item>
                                        <Form.Item
                                        {...field}
                                        name={[field.name, 'color']}
                                        fieldKey={[field.fieldKey, 'color']}
                                        rules={[{ required: true, message: 'Chưa điền màu sắc' }]}
                                        >
                                        <Input placeholder="Nhập màu sắc" />
                                        </Form.Item>
                                        
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Thêm ảnh sản phẩm
                                        </Button>
                                    </Form.Item>
                                </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                    

                    
                    <h3>Thông số kỹ thuật</h3>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['screenSize']} label="Màn hình" rules={[{ required: true }]}>
                                <Input placeholder={"vd: 6.4"}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['battery']} label="Dung lượng pin" rules={[{ required: true }]} >
                                <Input placeholder="vd: 4000" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['os']} label="Hệ điều hành">
                                <Input placeholder={"vd: Android 10"} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['frontCamera']} label="Camera trước" >
                                <Input placeholder="vd: 10 MP"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['backCamera']} label="Camera sau" >
                                <Input placeholder="vd: 3 camera 12 MP"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['cpu']} label="CPU">
                                <Input placeholder="vd: Apple A13 Bionic 6 nhân" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['ram']} label="Ram">
                                <Input placeholder="vd: 8 GB" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['internalMemory']} label="Bộ nhớ trong" >
                                <Input placeholder="vd: 256 GB" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['memoryStick']} label="Thẻ nhớ" >
                                <Input placeholder="vd: 64 GB" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['sim']} label="Thẻ sim" >
                                <Input placeholder="vd: 1 Nano SIM, 1 eSIM, Hỗ trợ 4G" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3>Thông tin thêm</h3>
                    <Form.Item name={['promotion']} label="Khuyến mãi">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name={['insideBox']} label="Bên trong hộp gồm">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['guarantee']} label="Bảo hành">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['introduction']} label="Mô tả sản phẩm">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    
            </div>
            <div style={{display: "flex", justifyContent: 'flex-end'}}>
                <Space>
                    <Button>
                        Quay lại
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Tạo sản phẩm
                    </Button>
                </Space>
            </div>
            
            
            </Form>
        );
    }
};

class FormEditProduct extends React.Component {
    onFinish = values => {
        console.log(values);
    };
    render() {
        const product = {
            key: '1',
            name: 'Lương Mạnh Đạt',
            birthday: '30/1/1997',
            phoneNumber: '0981988988',
            address: 'Vĩnh Tường, Vĩnh Phúc',
            email: 'luongdat97@gmail.com',
            role: 'Admin',
            username: 'datlm',
        }
        return (
            <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} initialValues={{ product: product }}>
                <div style={{ width: '100%' }}>
                    <Form.Item name={['product', 'productName']} label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'price']} label="Giá" rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="upload"
                        label="Ảnh sản phẩm"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <UploadImage />
                    </Form.Item>

                    
                    <h3>Thông số kỹ thuật</h3>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'screen']} label="Màn hình" rules={[{ type: 'email' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'os']} label="Hệ điều hành" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'frontCamera']} label="Camera trước" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'cpu']} label="CPU" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'ram']} label="Ram" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'internalMemory']} label="Bộ nhớ trong" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'memoryStick']} label="Thẻ nhớ" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'sim']} label="Thẻ sim" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...figureLayout} name={['product', 'battery']} label="Dung lượng pin" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3>Thông tin thêm</h3>
                    <Form.Item name={['user', 'introduction']} label="Khuyến mãi">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Bên trong hộp gồm">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Bảo hành">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Mô tả sản phẩm">
                        <Input.TextArea rows={3} />
                    </Form.Item>
            </div>
            </Form>
        );
    }
};

export default Home;

const UploadImage = (props) => {
    
    const onChange = ({ fileList: newFileList }) => {
        props.setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (

        <Upload
            //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={props.fileList}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={() => false}
            itemRender={(ReactElement, UploadFile, object) => {
                return (
                    <div>
                        {ReactElement}
                        <Form.Item name={'colorList'} rules={[{ required: true }]}>
                            <Input placeholder="Màu sắc" />
                        </Form.Item>
                        
                    </div>
                )
            }} 
        >
            + Tải ảnh
        </Upload>

    );
};