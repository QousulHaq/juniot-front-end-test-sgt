"use client";

import { useEffect, useState } from "react";
import { Popover, Avatar, Button, Typography, Space } from "antd";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

const { Text } = Typography;

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);

  // Pantau status user dari Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // refresh biar state bersih
  };

  if (!user) return null; // belum login → jangan tampilkan apa pun

  const content = (
    <div className="w-56">
      <Space direction="vertical" size="small" className="w-full text-center">
        <Avatar
          src={"images/profile/user.jpg"}
          size={64}
          className="mx-auto"
        />
        <div>
          <Text strong>{user.displayName || "User"}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {user.email}
          </Text>
        </div>
        <Button
          type="primary"
          danger
          block
          size="small"
          onClick={handleLogout}
          className="mt-2"
        >
          Logout
        </Button>
      </Space>
    </div>
  );

  return (
    <Popover placement="bottomRight" content={content} trigger="click">
      <Avatar
        src={"images/profile/user.jpg"}
        size="large"
        className="cursor-pointer hover:opacity-80 transition"
      >
        {!user.photoURL && user.email[0].toUpperCase()}
      </Avatar>
    </Popover>
  );
}
