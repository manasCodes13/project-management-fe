"use client";
import Image from "next/image";
import authImage from "../assets/auth.jpg";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Form, Input, notification, Spin } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, login } from "@/utils/networ";
import { createAccountInterface } from "../authInterface";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Context = React.createContext({ name: "Default" });

const Login: React.FC = () => {
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const [loaded, setLoaded] = useState(false);
  const [local, setLocal] = useState<any>(null);

  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Signed-in Successfully`,
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (local !== null) {
      localStorage?.setItem("user", JSON.stringify(local?.data));
      localStorage?.setItem("accessToken", local?.accessToken);
      router.push("/home/dashboard");
    }
  }, [local]);

  const loginAPIFunction = async (values: createAccountInterface | null) => {
    await axios
      .post(`${BASE_URL}${login}`, values)
      .then((res) => {
        setLocal(res?.data);

        openNotification("topRight");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values: any) => {
    delete values.remember;
    loginAPIFunction(values);
  };

  return (
    <>
      {loaded ? (
        <Context.Provider value={contextValue}>
          {contextHolder}
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
                onFinish={onFinish}
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
              <div>
                Dont&apos;t have an account!{" "}
                <Link href="/auth/register" className="text-blue-500">
                  Create an account
                </Link>
              </div>
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
        </Context.Provider>
      ) : (
        <div className="w-screen h-screen bg-white flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default Login;
