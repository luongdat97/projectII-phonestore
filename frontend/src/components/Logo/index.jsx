import React from "react";
import {Link} from 'react-router-dom'

const Logo = (props) => {
  return (
    <h1 style={{height: 64, marginRight: "2%" }}>
      {
        props.notLink && 
          <a style={{ fontWeight: 'bold' }}>
          <img alt="logo" style={{ width: 50, height: 50 }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          <span className="logo"> Phone Store</span>
        </a>
        
      }
      {
        !props.notLink && 
        <Link to="/">
          <a style={{ fontWeight: 'bold' }}>
            <img alt="logo" style={{ width: 50, height: 50 }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
            <span className="logo"> Phone Store</span>
          </a>
        </Link>
      }
      
      
    </h1>
  );
};

export default Logo;
