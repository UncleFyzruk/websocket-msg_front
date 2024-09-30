import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterHomeComponent = () => (
    <Footer style={{textAlign: 'center'}}>
        ВКР ©{new Date().getFullYear()} by Поздняков А.А
    </Footer>
)

export default FooterHomeComponent;