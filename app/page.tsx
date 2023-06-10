"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<any>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    if (accessToken) {
      router.push("/home/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, []);

  return <></>;
}
