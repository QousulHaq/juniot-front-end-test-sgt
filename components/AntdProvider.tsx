"use client"

import { ConfigProvider, theme } from "antd"
import { useEffect, useState, useCallback } from "react"

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Fungsi untuk cek apakah class "dark" ada di <html>
  const checkDarkMode = useCallback(() => {
    return document.documentElement.classList.contains("dark")
  }, [])

  useEffect(() => {
    // Set awal sesuai Tailwind class
    setIsDarkMode(checkDarkMode())

    // Observasi perubahan class pada <html>
    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode())
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [checkDarkMode])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#f97316", // warna brand (orange)
          colorBgBase: isDarkMode ? "#0d0d0d" : "#ffffff",
          colorBgContainer: isDarkMode ? "#1a1a1a" : "#f9fafb",
          colorText: isDarkMode ? "#e5e7eb" : "#111827",
          colorTextSecondary: isDarkMode ? "#9ca3af" : "#374151",
          borderRadius: 8,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
