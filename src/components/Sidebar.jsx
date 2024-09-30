import { Menu, Layout } from 'antd';
const { Sider } = Layout;

const Sidebar = ({collapsed, onCollapse, items1, items2, onOpenChange, onClick, handleProfileHover}) => (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="demo-logo-vertical"/>
        <Menu
            theme="dark"
            mode="vertical"
            items={items2}
            onMouseEnter={()=> handleProfileHover(true)}
            onMouseLeave={()=> handleProfileHover(false)}
            />
        <Menu
            theme="dark"
            defaultSelectedKeys={['profile']}
            mode="inline"
            items={items1}
            onOpenChange={onOpenChange}
            onClick={onClick}
            />
    </Sider>
);

export default Sidebar;