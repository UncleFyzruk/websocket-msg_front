import axios from "axios";

export const fetchAcceptFriend = async (id_friendship, new_status)=> {
    try {
       await axios.get(`http://localhost:8000/acceptfriendship?id_friendship=${id_friendship}&new_status=${new_status}`,
            { withCredentials: true });
       return true
    } catch (e) {
      console.error('Ошибка Принятия дружбы', e);
      throw e
    }
};