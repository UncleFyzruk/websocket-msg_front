import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined, MailOutlined} from "@ant-design/icons";
import axios from "axios";
import UseAuthRegist from "../components/useAuthRegist.jsx";
import {useNavigate} from "react-router-dom";
import qs from "qs";

const SignUp = () =>{

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    UseAuthRegist();


   const onFinish = async (values) => {
       if (values.password !== values.password_check){
           message.error("Пароли должны совпадать!")
           return;
       }
        const data = {
            email: values.email,
            password: values.password,
            is_active: true,
            is_superuser: false,
            is_verified: false,
            username: values.username,
        }

       try {
           console.log(data)
           const response = await axios.post("http://localhost:8000/auth/register", data, {
               headers: {
                   'Content-Type': 'application/json',
               },
               withCredentials: true,
           })
           if (response.status === 200 || response.status === 204 || response.status === 201) {
               message.success("Успешная регистрация!")
               navigate("/login")
           }

       } catch (e) {
           if (e.response.data.detail === "REGISTER_USER_ALREADY_EXISTS") {
               message.error("Такой пользователь или email уже существует")
           }
       }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg" >
        <Form
          name="normal_signup"
          className="signup-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
            <Form.Item>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-sans text-gray-900">Регистрация</h1>
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
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Никнейм"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
                {required: true, message: 'Пожалуйста, укажите Пароль!'},
                { min: 3, message: 'Пароль должен содержать минимум 3 символа!' },

            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>

             <Form.Item
                name="password_check"
                rules={[
                    {required: true, message: 'Пожалуйста, укажите Пароль!',},
                    { min: 3, message: 'Пароль должен содержать минимум 3 символа!' },
                ]}
            >
              <Input
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  type="password"
                  placeholder="Повторите пароль"
              />
            </Form.Item>

            <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, укажите Email!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

            <Form.Item>
                <div className="flex flex-col items-center">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Зарегистрироваться
                    </Button>
                    <div className="mt-2">
                        Или <a href="http://localhost:5173/login">Уже есть аккаунт</a>
                    </div>
                </div>
            </Form.Item>
        </Form>
      </div>
      </div>
);
}
export default SignUp;