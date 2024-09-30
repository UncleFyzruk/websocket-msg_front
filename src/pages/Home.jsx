import {useEffect, useRef, useState} from 'react';
import {Layout, Spin, theme, message as msg} from 'antd';
import useAuth from '../components/useAuth.jsx';
import useLogout from '../components/useLogout.jsx';
import UserProfileCard from '../components/UserProfileCard.jsx';
import getUserInfo from '../components/useUserInfo.jsx';
import { TeamOutlined, UserOutlined, MessageOutlined, LogoutOutlined } from '@ant-design/icons';
import Sidebar from "../components/Sidebar.jsx";
import HeaderHomeComponent from "../components/HeaderHomeComponent.jsx";
import ContentChatComponent from "../components/ContentChatComponent.jsx";
import FooterHomeComponent from "../components/FooterHomeComponent.jsx";
import {fetchFriends} from "../api_requests/getFriends.js";
import {fetchChats} from "../api_requests/getChats.js";
import {createWebSocket, sendMessage} from "../api_requests/websoket_transfer.js";
import ContentFriendComponent from "../components/ContentFriendComponent.jsx";
import {fetchAcceptFriend} from "../api_requests/acceptFriendship.js";
import {fetchAddChats} from "../api_requests/createPrivateChat.js";
import {fetchAddFriend} from "../api_requests/addFriend.js";



function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendFetched, setFriendsFetched] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatFetched, setChatsFetched] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
    const [userData, setUserData] = useState(null);
    const [activeContent, setActiveContent] = useState(null)

    const statusFriendship = useRef(null)

    // const [ws, setWs] = useState(null);

  useAuth();
  const logout = useLogout();

  // Хук для получения информации о текущем пользователе
  useEffect(() => {
      const fetchUserData = async () => {
          const userInfo = await getUserInfo();
          setUserData(userInfo)

          if (userInfo) {
              const ws = createWebSocket(userInfo[0].username, (message) => {
                  setMessages(prevMessages => [...prevMessages, message])
              });

              return () => {
                  if (ws) {
                      ws.close()
                  }
              }
          }
      }
      fetchUserData();
  }, []);

  const onOpenChange = async (e) => {
    // if (e.includes('sub1') && !friendFetched) {
    //     const friendsData = await fetchFriends();
    //     setFriends(friendsData);
    //     setFriendsFetched(true);
    // }
    if (e.includes('sub2') && !chatFetched) {
        const chatData = await fetchChats();
        setChats(chatData)
        setChatsFetched(true);
    }
  };

  const onClick = async (e) => {
      if (e.key === 'exit') {
          await logout();
      } else if (e.key === 'sub1' && !friendFetched){
          statusFriendship.current = 'friend'
          const friendsData = await fetchFriends(statusFriendship);
          setActiveContent('friend')
          setFriends(friendsData);
          setFriendsFetched(true)
      }
  };

  const handleProfileHover = (hover) => {
      setIsProfileHovered(hover);
  };

  const handleCardHover = (hover) => {
    setIsCardHovered(hover);
  };

  const handleSendMessage = () => {
    if (message.trim() && activeChat) {

        // console.log(chatDetails)
        // const chatDetails = chats.find((chat) => chat.key === activeChat.key);
        // console.log(chatDetails.label, "ti napisal")
        sendMessage(message, userData[0].username,activeChat.label, activeChat.key);
        setMessages([...messages, { username_sender: userData[0].username, text_message: message,
            message_at: new Date().toISOString() }]);
        setMessage('');
    }
  };

  const handleMessageClick = async (friendID) => {

      let chatData = await fetchChats();
      if (chatData) {
          await fetchAddChats(friendID)
          chatData = await fetchChats();
      }

      const chatDetails = chatData.find((chat) => chat.label === friendID);
      if (chatDetails) {
          await handleChatClick(chatDetails);}
  }


  const handleChatClick = async (chat) => {
      setFriendsFetched(false)
      setActiveContent('chats')
      setActiveChat(chat)
  }

  const handleShowFriendRequest = async () => {
      statusFriendship.current ='friend_request'
      const friendsRequest = await fetchFriends(statusFriendship);
      setFriends(friendsRequest);

  }

  const handleAddFriend = async (friendUsername) => {
      await fetchAddFriend(friendUsername)
      msg.success("Запрос отправлен")
  }

  const handleShowFriend = async () => {
      statusFriendship.current = 'friend'
      const friendsData = await fetchFriends(statusFriendship);
      setActiveContent('friend')
      setFriends(friendsData);
      setFriendsFetched(true)
  }

  const handleAcceptFriendRequest = async (id_friendship) => {
      try {
          const new_status = "friend"
          if (await fetchAcceptFriend(id_friendship, new_status)){
              statusFriendship.current ='friend_request'
              const friendsRequest = await fetchFriends(statusFriendship);
              setFriends(friendsRequest);
          }
      } catch (e) {
          msg.error("Технические шоколадки")
          console.error("Ошибка Принятия дружбы", e)
      }
  }

  const chatItems = chats.map(chat =>({
      ...chat,
      onClick: ()=> handleChatClick(chat),
  }) )

  const items = [
      getItem('Друзья', 'sub1',<TeamOutlined />),
      getItem('Чаты', 'sub2', <MessageOutlined />, chatItems),
      getItem('Выйти', 'exit', <LogoutOutlined />),
  ];

  const items2 = [
    getItem('Ваш профиль', 'profile', <UserOutlined />),
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
          collapsed={collapsed}
          onCollapse={(value)=> setCollapsed(value)}
          items1={items}
          items2={items2}
          onOpenChange={onOpenChange}
          onClick={onClick}
          handleProfileHover={handleProfileHover}
          />
      <Layout>
          <HeaderHomeComponent colorBgContainer={colorBgContainer} />
          {userData ? (
              activeContent === 'chats' ? (
                  <ContentChatComponent
                      activeChat={activeChat}
                      messages={messages}
                      message={message}
                      handleSendMessage={handleSendMessage}
                      setMessage={setMessage}
                      colorBgContainer={colorBgContainer}
                      borderRadiusLG={borderRadiusLG}
                      currentUsername={userData[0].username}
                      setMessages={setMessages}

                  />
                  ) : (
                      <ContentFriendComponent
                          colorBgContainer={colorBgContainer}
                          borderRadiusLG={borderRadiusLG}
                          friends={friends}
                          onMessageClick={handleMessageClick}
                          onShowFriendRequests={handleShowFriendRequest}
                          onAddFriend={handleAddFriend}
                          onShowFriends={handleShowFriend}
                          statusFriendship={statusFriendship}
                          onAcceptFriendRequest={handleAcceptFriendRequest}
                      />
              )
          ): (
              <Spin size="large"/>
          )}

          <FooterHomeComponent />
          {(isProfileHovered || isCardHovered) && userData && (
              <div
                  style={{ position: 'absolute', zIndex: 1000, top: '10px', left: '210px' }}
                  onMouseEnter={() => handleCardHover(true)}
                  onMouseLeave={() => handleCardHover(false)}
              >
                  <UserProfileCard userInfo={userData} />
              </div>
          )}
          <div style={{ margin: '24px 0' }} />
      </Layout>
    </Layout>
  );
};

export default Home;
