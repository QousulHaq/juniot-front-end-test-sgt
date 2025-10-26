"use client"

import React from "react"
import { useTheme } from "../hooks/useTheme"
import { Moon, Sun } from "lucide-react"

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white dark:bg-neutral-900 shadow">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        🛍️ Product Dashboard
      </h1>

      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {theme === "dark" ? (
          <Sun size={18} className="text-yellow-300" />
        ) : (
          <Moon size={18} className="text-gray-800" />
        )}
      </button>
    </nav>
  )
}

export default Navbar
