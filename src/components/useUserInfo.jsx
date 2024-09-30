import { message} from "antd";
import axios from "axios";


const getUserInfo = async () => {
    try {
        const response = await axios.get('http://localhost:8000/profile',
            {withCredentials: true})
        return response.data;
    } catch (e) {
        message.error('Непонятки');
        return null;
    }
}

export default getUserInfo;