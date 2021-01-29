import { Input, Select } from 'antd';
import React, { Component, useEffect, useState } from "react";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
const { Option } = Select;
const { Search } = Input;
const onSearch = value => console.log(value);
const SearchMenu = () => {
    const [phoneData, setPhoneData] = useState([])
    const [selectedPhone, setSelectedPhone] = useState(null)
    useEffect(() => {
        fetchData();
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
    console.log("phoneData..........")
    console.log(phoneData)
    if(selectedPhone) window.location.href = "/phone-detail/" + selectedPhone;
    // return (
    //     <Redirect to={"/phone-detail/" + selectedPhone}/>
    // )

    return (
        <div style={{ display: "inline-flex"}} >
            <Select
                showSearch
                optionFilterProp="children"
                
                onChange={(e)=> setSelectedPhone(e)}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                placeholder="Nhập tên điện thoại cần tìm..."
                allowClear
                enterButton="Tìm kiếm"
                size="large"
                style = {{width: "auto"}}
            >
                {phoneData.map((item, index) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                ))}
            </Select>
        </div>
        
    );
}

export default SearchMenu;