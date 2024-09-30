import axios from "axios";

export const fetchChatHistory = async (chatID, offset = 0, limit = 10) => {
    try {
        const response = await axios.get(`http://localhost:8000/chat/history?chat_id=${chatID.key}&offset=${offset}&limit=${limit}`,
            {withCredentials: true})
        return response.data
    } catch (e){
        console.log("Oshibka polychenia dialoga", e)
        throw e;
    }
};