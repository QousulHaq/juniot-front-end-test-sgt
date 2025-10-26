"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

const { Title, Text } = Typography;

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Membuat user baru di Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Bisa tambahkan display name (kalau ada field tambahan)
      await updateProfile(userCredential.user, {
        displayName: values.email.split("@")[0],
      });

      message.success("Registrasi berhasil! Anda akan diarahkan ke halaman login.");
      router.push("/"); // Arahkan ke halaman login

    } catch (error: any) {
      console.error("Register error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        message.error("Email sudah terdaftar. Gunakan email lain.");
      } else if (error.code === "auth/weak-password") {
        message.error("Password terlalu lemah (minimal 6 karakter).");
      } else {
        message.error("Terjadi kesalahan saat registrasi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Register failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--ant-color-bg-base)]">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-[var(--ant-color-bg-container)]">
        <div className="mb-6 text-center">
          <Title level={3} style={{ marginBottom: 4 }}>
            Register
          </Title>
          <Text type="secondary">Buat akun baru Anda</Text>
        </div>

        <Form
          name="register"
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
            rules={[
              { required: true, message: "Masukkan password Anda!" },
              { min: 6, message: "Minimal 6 karakter!" },
            ]}
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
              loading={loading}
              block
              size="large"
              className="!bg-[#f97316]"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6">
          <Text type="secondary">
            Sudah punya akun? <Link href="/">Login</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
