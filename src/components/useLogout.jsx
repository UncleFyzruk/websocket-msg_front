import { message} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const useLogout = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

     const logout = async () => {
            try {
                const response = await axios.post('http://localhost:8000/auth/jwt/logout',
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
     return  logout
}
export default useLogout;