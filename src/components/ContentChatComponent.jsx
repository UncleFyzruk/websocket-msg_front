import {Breadcrumb, Layout, Input, Button, Skeleton, Card, Divider} from 'antd';
import UseMessageList from "./useMessageList.jsx";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useEffect, useRef, useState} from "react";
import {fetchChatHistory} from "../api_requests/getHistory.js";

const { Content } = Layout;
const { TextArea } = Input;

const ContentChatComponent = ({
    activeChat,
    messages,
    message,
    handleSendMessage,
    setMessage,
    colorBgContainer,
    borderRadiusLG,
    currentUsername,
    setMessages,

}) => {
    const offset = useRef(0)
    const [hasMore, setHasMore] = useState(true)
    const messagesEndRef = useRef(null);

    const loadMoreData = async () => {
        if (activeChat) {
            const newMessages = await fetchChatHistory(activeChat, offset.current, 10)
            setMessages(prevMessages => [...newMessages, ...prevMessages])
            offset.current += 10
            if (newMessages.length < 10){
                setHasMore(false)
            }
        }
    }

    useEffect(() => {
        console.log('smena chata')
        offset.current = 0
        setHasMore(true)
        setMessages([])
        loadMoreData()

    }, [activeChat]);

    useEffect(() => {
        offset.current = 0
        console.log(offset)
    }, [activeChat]);

    useEffect(() => {
        if (messagesEndRef.current){
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
        }
    }, [messages]);

    const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

     return (
    <Content style={{ margin: `0 16px`}}>
        <Breadcrumb style={{ margin: `16px 0`}} >
            <Breadcrumb.Item>Личный чат</Breadcrumb.Item>
            <Breadcrumb.Item>{activeChat.label}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {activeChat ? (
                <>
                    <div id="scrollableDiv"
                         style={{
                             height: 400,
                             overflow: 'auto',
                             padding: '0 16px',
                             border: '1px solid rgba(140,140,140, 0.35)',
                             display: 'flex',
                             flexDirection: 'column-reverse'
                         }}>
                        <InfiniteScroll
                            dataLength={messages.length}
                            next={loadMoreData}
                            hasMore={hasMore}
                            // loader={<Skeleton active/>}
                            inverse={true}
                            scrollableTarget="scrollableDiv"
                        >
                            <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                                <UseMessageList messages={messages} currentUsername={currentUsername}/>
                            </div>
                        </InfiniteScroll>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: 10}}>
                    <TextArea
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)}}
                        placeholder="Напишите сообщение"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        onPressEnter={handleKeyPress}
                    />
                    <Button type="primary" onClick={handleSendMessage} style={{ marginTop: 10 }}>
                        Отправить
                    </Button>
                    </div>
                </>
            ): (
                <div>Привет</div>
            )}
        </div>
    </Content>
);
}

export default ContentChatComponent;