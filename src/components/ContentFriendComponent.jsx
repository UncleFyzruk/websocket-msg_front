import {Breadcrumb, Button, Input, Layout, Space} from 'antd';
import UseFriendList from "./UseFriendList.jsx";
import {useState} from "react";

const { Content } = Layout;


const ContentFriendComponent = ({
    colorBgContainer,
    borderRadiusLG,
    friends,
    onMessageClick,
    onShowFriendRequests,
    onAddFriend,
    onShowFriends,
    statusFriendship,
    onAcceptFriendRequest
}) => {
    const [isAddFriendVisible, setAddFriendVisible] = useState(false);
    const [friendUsername, setFriendUsername] = useState("");

    const handleAddFriendClick = () => {
        setAddFriendVisible(true);
    };

    const handleSendFriendRequest = () => {
        onAddFriend(friendUsername);
        setFriendUsername("");
        setAddFriendVisible(false);
    };


    return (
    <Content style={{ margin: `0 16px`}}>
        <Breadcrumb style={{ margin: `16px 0`}} >
            <Breadcrumb.Item>Друзья</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
             <Space style={{ marginBottom: 16 }}>
                 <Button type="primary" onClick={onShowFriends}>Друзья</Button>
                <Button type="default" onClick={onShowFriendRequests}>Запросы в друзья</Button>
                <Button type="default" onClick={handleAddFriendClick}>Добавить друга</Button>

            </Space>
            {
                isAddFriendVisible && (
                    <Space>
                        <Input
                            placeholder="Введите имя друга"
                            value={friendUsername}
                            onChange={e => setFriendUsername(e.target.value)}
                        />
                        <Button type="primary" onClick={handleSendFriendRequest}>Отправить запрос</Button>
                    </Space>
                )
            }

            <UseFriendList friends={friends} onMessageClick={onMessageClick}
                           onAcceptFriendRequest={onAcceptFriendRequest} statusFriendship={statusFriendship}/>
        </div>
    </Content>
);
}
export default ContentFriendComponent;