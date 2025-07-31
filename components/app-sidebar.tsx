"use client";
import { useEffect, useState } from "react";
import { items } from "@/lib/data";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Moon, Sun } from "lucide-react"; // you can replace with any icon you use

export function AppSidebar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load from local storage if exists
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Sidebar className="bg-white dark:bg-sidebar border-r border-black/10 dark:border-white/10 flex flex-col justify-between">
      <SidebarContent className="bg-white dark:bg-black flex-1">
        <SidebarGroup>
          <SidebarGroupLabel
            className="text-2xl md:text-4xl font-semibold text-blue-400 py-6
          mb-5"
          >
            Coniq
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-black dark:text-white hover:bg-black dark:hover:bg-white/10 rounded-md transition"
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="text-[0.95rem]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Dark mode toggle */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
        <span className="text-sm text-black dark:text-white">Dark Mode</span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </Sidebar>
  );
}
