import React, {useEffect, useState} from 'react';
import {Button, Flex, message, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useAuth from "../components/useAuth.jsx";
import UserProfileCard from "../components/UserProfileCard.jsx";

const Chat = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useAuth()

    const getUserInfo = async () => {
        await axios.get('http://localhost:8000/profile', {withCredentials: true}).then((response) => {
            setUserData(response.data);
        })
    }

    useEffect(() => {
        getUserInfo()
    }, []);

    const useLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth_old/jwt/logout',
                {},
                {
                    withCredentials: true,
                })

            if (response.status === 200 || response.status === 204) {
                message.success('Вы успешно вышли из системы')
                navigate('/login');
            }
        } catch (error) {
            message.error("Logout failed");
        }
    }


    return(
        <div className="flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {userData ? <UserProfileCard userInfo={userData}/> : <Spin size="large"/>}
             <Flex gap="small" wrap="wrap">
                  <Button type="primary" href="http://localhost:5173/chat">
                    Тупа на себя
                  </Button>
                 <Button type="primary" href="http://localhost:5173/home">
                    Тупа на хоме
                  </Button>
                 <Button type="primary" onClick={useLogout}>
                     Разлогиниться
                 </Button>
             </Flex>
        </div>
    )
};

export default Chat;