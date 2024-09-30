import {List, Card} from "antd";
import '../styles/MessageList.css'

const UseMessageList = ({messages, currentUsername}) => {
    return(
        <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => (
                <List.Item
                    className={`flex ${item.username_sender === currentUsername ? 'justify-start' : 'justify-end'} mb-2`}>
                    <div
                        className={`w-full ${item.username_sender === currentUsername ? 'text-left' : 'text-right'}`}>
                        <Card
                            title={`${item.username_sender} at ${new Date(item.message_at).toLocaleTimeString()}`}
                            className={item.username_sender === currentUsername ? 'bg-green-100 text-right': 'bg-blue-100 text-left'}
                            style={{
                                maxWidth: '100%',
                                wordWrap: 'break-word', // Перенос слов, чтобы текст не выходил за границы
                                overflow: 'hidden',     // Скрытие переполненного текста
                                textOverflow: 'ellipsis', // Добавление многоточия для переполненного текста
                            }}
                        >
                            {item.text_message}
                        </Card>
                    </div>
                </List.Item>
            )}
        />
    )
}
export default UseMessageList;