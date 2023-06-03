"use client";
import Image from "next/image";
import authImage from "../assets/auth.jpg";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createAccountInterface } from "../authInterface";
import axios from "axios";
import { BASE_URL, register, verifyOtp } from "@/utils/networ";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const otpVerificationAPIFunction = async () => {
    const userData = JSON.parse(localStorage.getItem("user") as string);
    await axios
      .post(`${BASE_URL}${verifyOtp}`, {
        user_id: userData?._id,
        otp: otp,
      })
      .then((res) => {
        console.log("res", res.data);
        router.push("/auth/login");
      });
  };

  //   API Call Function
  const registerAPIFunction = async (values: createAccountInterface | null) => {
    await axios
      .post(`${BASE_URL}${register}`, values)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        showModal();
        // otpVerificationAPIFunction();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onFinish = (values: any) => {
    delete values.remember;
    registerAPIFunction(values);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loaded ? (
        <div className="w-screnn h-screen bg-white flex">
          {/* Left SIde */}
          <div className="w-1/2 flex justify-center items-center pl-10 flex-col">
            <div className="font-semibold text-4xl">Create Your Account</div>
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
                  Create Account
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
      <Modal
        title="Verify OTP"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        maskClosable={false}
        centered
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            className="bg-[#1677ff] text-white font-medium"
            onClick={otpVerificationAPIFunction}
          >
            Submit
          </Button>,
        ]}
      >
        <Input
          placeholder="Please Enter the OTP"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};

export default Register;
