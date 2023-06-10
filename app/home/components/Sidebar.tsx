"use client";
import React, { useEffect, useState } from "react";
import { useKeyboardShortcut } from "../../../hooks/customKeyboard";
import { MdSpaceDashboard } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { Button, Modal } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [path, setPath] = useState<any>(null);

  useEffect(() => {
    setPath(pathname);
  }, []);

  useEffect(() => {
    if (path !== null) router.push(path);
  }, [path]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useKeyboardShortcut(["ctrl", "k"], showModal);

  return (
    <>
      <div className="w-56 border-r-2 h-full bg-[#333]">
        <div className="w-full flex justify-center pt-5">
          <Button
            type="primary"
            icon={<AiOutlineSearch />}
            className="bg-gray-500 outline-none border-none hover:bg-gray-600"
            onClick={showModal}
          >
            Ctrl+K to Search
          </Button>
        </div>
        <div className="w-full pt-7 ">
          <div
            className={`${
              path == "/home/dashboard"
                ? "h-10 flex items-center pl-5 bg-white"
                : "h-10 flex items-center pl-5"
            }`}
            onClick={() => {
              setPath("/home/dashboard");
            }}
          >
            <MdSpaceDashboard
              className={`${
                path == "/home/dashboard"
                  ? "text-xl text-black"
                  : "text-xl text-white"
              }`}
            />
            <span
              className={`${
                path == "/home/dashboard"
                  ? "ml-4 text-black"
                  : "ml-4 text-white"
              }`}
            >
              Dashboard
            </span>
          </div>
          <div
            className={`${
              path == "/home/projects"
                ? "h-10 flex items-center pl-5 bg-white mt-2"
                : "h-10 flex items-center mt-2 pl-5"
            }`}
            onClick={() => {
              setPath("/home/projects");
            }}
          >
            <MdSpaceDashboard
              className={`${
                path == "/home/projects"
                  ? "text-xl text-black"
                  : "text-xl text-white"
              }`}
            />
            <span
              className={`${
                path == "/home/projects" ? "ml-4 text-black" : "ml-4 text-white"
              }`}
            >
              Projects
            </span>
          </div>
        </div>
      </div>
      <Modal
        title="Search"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<Button onClick={handleOk}>OK</Button>]}
      >
        Search box in development
      </Modal>
    </>
  );
};

export default Sidebar;
