import { Form, Input, Spin } from "antd";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOGIN } from "../../api/ApiConstant";
import { postData } from "../../api/CommonServices";

const Login = () => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    setLoading(true)
    const data = {
      email: values.email,
      password: values.password
    }
    const res = await postData(LOGIN, data);
    if (res.status === 'success') {
      localStorage.setItem("access_token", JSON.stringify(res.accessToken));
      localStorage.setItem("user", JSON.stringify(res.user));
  
      toast.success("Login Successfully!");
      navigate('/profile')
      window.location.reload();
    }
    setLoading(false)
  };
  return (
    <Spin spinning={loading}>
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 shadow-xl ">
        <h2 className="text-xl text-center font-bold mb-4">Login</h2>
        <Form
          name="form_item_path"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "please enter password" },
              { min: 8, message: "password minimum length 8 characters" },
            ]}
          >
            <Input.Password minLength={8} />
          </Form.Item>

          <Form.Item>
            <button htmlType="submit" className="btn btn-accent w-full">
              Login
            </button>
            {/* <Button type="primary" >
             
            </Button> */}
          </Form.Item>
          <p className="text-center text-base">Don't have account ? please <Link className="text-cyan-600" to="/rider-signup">Join as a rider</Link> or <Link className="text-cyan-600" to="/driving-learner-signup">Join as a driving learner</Link> </p>
        </Form>
      </div>
    </div>
    </Spin>
  );
};

export default Login;
