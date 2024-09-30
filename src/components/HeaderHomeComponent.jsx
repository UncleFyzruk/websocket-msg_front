import React from "react";
import {Layout} from "antd";

const {Header} = Layout

const HeaderHomeComponent = ({ colorBgContainer })=> (
    <Header style={{padding: 0, background: colorBgContainer}}/>
)

export default HeaderHomeComponent