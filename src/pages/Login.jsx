import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Form, Input, message} from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import qs from "qs"
import useAuth from "../components/useAuth.jsx";

const Login = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useAuth(); // Проверяет авторизованы на данный момент или нет.

  const onFinish = async (values) => {
    const data = qs.stringify({
      grant_type: '',
      username: values.username,
      password: values.password,
      scope: '',
      client_id: '',
      client_secret: '',
    });

    try {
      const response = await axios.post("http://localhost:8000/auth/jwt/login",
        data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
            withCredentials: true,
        });

      if (response.status === 200 || response.status === 204) {
        message.success("Привет!");
        navigate("/home");
      }
    } catch (error) {
      message.error("Неверные данные");
      console.log(error);
    }
    // console.log('Received values of form: ', values);
  };


  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
          <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
          >
              <Form.Item>
                  <div className="flex flex-col items-center">
                      <h1 className="text-2xl font-sans text-gray-900">Авторизация</h1>
                  </div>
              </Form.Item>
              <Form.Item
                  name="username"
                  rules={[
                      {
                          required: true,
                          message: 'Пожалуйста, укажите Ваш никнейм!',
                  },
                ]}
            >
              <Input
                  prefix={<UserOutlined className="site-form-item-icon"/>}
                  placeholder="Никнейм"
              />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, укажите Пароль!',
                  },
                ]}
            >
              <Input
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  type="password"
                  placeholder="Пароль"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex flex-col items-center">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Войти
              </Button>
                <div className="mt-2">
                  Или <a href="http://localhost:5173/signup">Зарегистрироваться!</a>
                  </div>
             </div>
            </Form.Item>
          </Form>
        </div>
      </div>
        );
        };
        export default Login;