import {List, Avatar, Button} from "antd";
import '../styles/MessageList.css'

const UseFriendList = ({friends, onMessageClick, onAcceptFriendRequest, statusFriendship}) => {
    return(
        <List
            itemLayout="horizontal"
            dataSource={friends}
            renderItem={(item) => (

                <List.Item
                    actions={[
                        statusFriendship.current === 'friend' ? (
                            <Button onClick={() => onMessageClick(item.label)}>Написать сообщение</Button>
                        ) : statusFriendship.current === 'friend_request' ? (
                            <Button onClick={() => onAcceptFriendRequest(item.key)}>Подружиться</Button>
                        ) : null
                    ]}>
                   <List.Item.Meta
                       avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                       title={item.label}
                       />
                </List.Item>
            )}
        />
    )
}
export default UseFriendList;