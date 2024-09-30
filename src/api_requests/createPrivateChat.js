import axios from "axios";


export const fetchAddChats = async (target) => {
    try {
        const response = await axios.post('http://localhost:8000/chat/createChat',
            {sec_username: target}, { withCredentials: true });

    } catch (e) {
      console.error('Error fetching chats', e);
      throw e;
    }
}