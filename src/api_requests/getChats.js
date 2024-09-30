import axios from "axios";

export const fetchChats = async () => {
    try {
        const response = await axios.get('http://localhost:8000/chat/getChatPlus', { withCredentials: true });
        // const chatData = response.data.flatMap((chat) =>
        //     chat.user_chat.map((user) => ({
        //         key: user.chat_id,
        //         label: user.chat_id,
        //     })));
        const chatData = response.data.map((chat) => ({
            key: chat.chat_id,
            label: chat.user_username
        }))
        return chatData;
    } catch (e) {
      console.error('Error fetching chats', e);
      throw e;
    }
}