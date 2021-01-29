import { Button, Card, Col, DatePicker, Form, Tabs, Radio, Layout, message, Modal, Row, Select, Space, Table, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { default as React, useEffect, useState } from "react";
import ManagerMenu from "../../../components/ManagerMenu";
import Logo from "../../../components/Logo";
import SearchMenu from "../../../components/SearchMenu";
import { Bar } from "react-chartjs-2"
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Meta } = Card;
const { Title } = Typography;

const Home = () => {
    return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Logo notLink={true}/>
                    <ManagerMenu  selectedKeys={["4"]} />
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ minHeight: 750, background: '#fff', padding: 25 }}>
                        <h2>Thống kê bán hàng</h2>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Bảng bán hàng" key="1">
                                <ListSale />
                            </TabPane>
                            <TabPane tab="Biểu đồ doanh số" key="2">
                                <ChartSale />
                            </TabPane>
                        </Tabs>



                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
    );
};
export default Home;

const ChartSale = (props) => {
    useEffect(() => {   
        fetchChart()
    }, [])
    const [chart, setChart] = useState([])
    const [labels, setLabels] = useState([])
    const fetchChart = () => {
        let url = 'http://localhost:8080/order/statistic/chart';
        let config = {
            method: 'get',
            url: url,
        };

        axios(config)
            .then((response) => {
                console.log("..................")
                console.log(response)
                let now = new moment()
                let curMonth = now.month() + 1
                let curYear = now.year()
                let chartData = response.data
                let j = 0
                let chart = []
                let labels = []
                
                for (let i = 11; i >= 0; i--){
                    
                    let month = curMonth - i;
                    let year = curYear
                    if (month < 1) {
                        month += 12;
                        year -= 1;
                    }
                    labels.push("Tháng " + month + '/' + year)
                    let monthString = month >= 10 ? month : '0' + month
                    if (chartData[j][0] === year + "-" + monthString) {
                        
                        chart.push(chartData[j][1])
                        j++
                    } else{
                        chart.push(0)
                    }
                }
                setChart(chart)
                setLabels(labels)
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    
    return (
        
        <>
            <Title level={5}>Doanh số bán hàng trong 12 tháng gần đây</Title>
            <div style={{width: 900}}>
                <Bar
                    data={{
                        labels: labels,
                        datasets: [{
                            label: 'số sản phẩm',
                            data: chart,
                            backgroundColor: 
                                
                                'rgba(54, 162, 235, 0.2)',
                                
                            borderColor: 
                                'rgba(54, 162, 235, 1)',
                                
                            borderWidth: 1
                        }]
                    }}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
            
        </>

    )
}

const ListSale = () => {
    //code 1: month, 2 : quarter, 3 : year
    const [listInvoice, setListInvoice] = useState([])
    const [selectedCriteria, setSelectedCriteria] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(new moment());
    const [selectedQuarter, setSelectedQuarter] = useState(new moment());
    const [selectedYear, setSelectedYear] = useState(new moment());

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

    useEffect(() => {
        let date
        if (selectedCriteria === 1) date = selectedMonth;
        if (selectedCriteria === 2) date = selectedQuarter;
        if (selectedCriteria === 3) date = selectedYear;
        fetchInvoice(date);
    }, [selectedCriteria, selectedMonth, selectedQuarter, selectedYear])

    const fetchInvoice = (date) => {
        let url = 'http://localhost:8080/order/statistic/by-month?date=' + date + "&type=" + selectedCriteria;
        let config = {
            method: 'get',
            url: url,
        };

        axios(config)
            .then((response) => {
                let invoices = response.data.map((data, index) => {
                    let totalMoney = 0;
                    let invoiceLine = data.orderPhones;
                    invoiceLine.map(data => totalMoney += data.quantity * data.phone.phoneType.price)
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
        <>
            <span>Thống kê theo: </span>
            <Radio.Group defaultValue={selectedCriteria} buttonStyle="solid" onChange={(e) => setSelectedCriteria(e.target.value)}>
                <Radio.Button value={1}>Tháng</Radio.Button>
                <Radio.Button value={2}>Quý</Radio.Button>
                <Radio.Button value={3}>Năm</Radio.Button>
            </Radio.Group>
            <div style={{ marginTop: 15 }}>
                <span>Chọn thời gian: </span>
                <DatePicker format="MM/YYYY" defaultValue={new moment()} picker="month" style={{ display: selectedCriteria === 1 ? null : "none" }} onChange={(date) => setSelectedMonth(date)} />
                <DatePicker defaultValue={new moment()} picker="quarter" style={{ display: selectedCriteria === 2 ? null : "none" }} onChange={(date) => setSelectedQuarter(date)} />
                <DatePicker defaultValue={new moment()} picker="year" style={{ display: selectedCriteria === 3 ? null : "none" }} onChange={(date) => setSelectedYear(date)} />
            </div>


            <Table dataSource={listInvoice} columns={columns} style={{ marginTop: 15 }} />
        </>


    );
};

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
                        <Col span={6} style={{ fontWeight: 'bold' }}>ngày:</Col>
                        <Col span={18}>12/12/2020</Col>
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
                        <Col span={18}>Hoàng Văn An</Col>
                    </Row>
                </Space>

                <h3>1. Thông tin khách hàng</h3>

                <Row>
                    <Col span={4} style={{ fontWeight: 'bold' }}>Họ tên:</Col>
                    <Col span={4}>{customer.name}</Col>
                </Row>
                <Row>
                    <Col span={4} style={{ fontWeight: 'bold' }}>Email:</Col>
                    <Col span={4}>{customer.email}</Col>
                </Row>
                <Row>
                    <Col span={4} style={{ fontWeight: 'bold' }}>Số điện thoại:</Col>
                    <Col span={4}>{customer.phoneNumber}</Col>
                </Row>
                <Row>
                    <Col span={4} style={{ fontWeight: 'bold' }}>Địa chỉ giao hàng:</Col>
                    <Col span={4}>{props.data.detail.address}</Col>
                </Row>
                <h3 style={{ paddingTop: 20 }}>2. Đơn hàng</h3>

                <Table dataSource={data} columns={columns} pagination={false} ></Table>

                <div style={{ padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
                    <h3>Thành tiền: </h3>
                    <h3>{countTotal(props.data.detail).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</h3>
                </div>
            </Modal>
        </>
    );
}
