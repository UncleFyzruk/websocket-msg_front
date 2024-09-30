import axios from "axios";
import {message} from "antd";

// Отправка заявки в друзья другому пользователю
export const fetchAddFriend = async (target)=> {
    // target - имя пользователя кому отправляем запрос
    try {
        await axios.post('http://localhost:8000/addfriends', {sec_username: target,
             new_status: "friend_request"}, { withCredentials: true });

    } catch (e) {
        message.error('Такого пользователя нет, либо вы уже друзья')
      console.error('Ошибка выполнения запроса', e);
      throw e;
    }
};