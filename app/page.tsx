"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import { GoogleOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Firebase imports
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { email, password } = values;

      // 🔥 Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      console.log("Firebase Login success:", user);
      console.log("Firebase Token:", token);

      message.success("Login berhasil!");
      router.push("/products"); // ganti ke halaman utama kamu
    } catch (error: any) {
      console.error("Firebase Login error:", error);
      message.error(
        error.message || "Login gagal, periksa email dan password Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Login failed:", errorInfo);
  };

  const handleGoogleLogin = async () => {
    try {
      // Pastikan langsung dijalankan dari onClick, bukan async terpisah
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Dapatkan token ID untuk dikirim ke backend
      const idToken = await result.user.getIdToken();
      console.log("✅ Firebase ID Token:", idToken);

      message.success("Login berhasil!");
      router.push("/products"); // ganti ke halaman utama kamu
    } catch (error: any) {
      console.error("❌ Google login error:", error.message);
      if (error.code === "auth/popup-blocked") {
        alert(
          "Browser memblokir popup login Google. Coba klik tombolnya lagi."
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--ant-color-bg-base)]">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-[var(--ant-color-bg-container)]">
        <div className="mb-6 text-center">
          <Title level={3} style={{ marginBottom: 4 }}>
            Login
          </Title>
          <Text type="secondary">Masuk ke akun Anda</Text>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Masukkan email Anda!" },
              { type: "email", message: "Format email tidak valid!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="email@example.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Masukkan password Anda!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="********"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="!bg-[#f97316]"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <Divider>atau</Divider>

        <Button
          icon={<GoogleOutlined />}
          block
          size="large"
          type="default"
          loading={loading}
          onClick={handleGoogleLogin}
        >
          Login dengan Google
        </Button>

        <div className="text-center mt-6">
          <Text type="secondary">
            Belum punya akun? <Link href="/register">Daftar</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
