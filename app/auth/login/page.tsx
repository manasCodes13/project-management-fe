"use client";
import Image from "next/image";
import authImage from "../assets/auth.jpg";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded ? (
        <div className="w-screnn h-screen bg-white flex">
          {/* Left SIde */}
          <div className="w-1/2 flex justify-center items-center pl-10 flex-col">
            <div className="font-semibold text-4xl">
              Welcome Back! Please Login
            </div>
            <Form
              name="normal_login"
              className="login-form w-96 mt-10"
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  className="h-10 mt-1"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  className="h-10"
                />
              </Form.Item>
              <Form.Item className="flex justify-between w-full">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="login-form-button bg-[#1677ff] text-white w-full h-10"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/* Right Side */}
          <div className="w-1/2">
            <Image
              src={authImage}
              alt="authImage"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen bg-white flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default Login;
