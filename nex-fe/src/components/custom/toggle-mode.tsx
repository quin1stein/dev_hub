"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { TbSunMoon } from "react-icons/tb";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "Light" : "Dark"}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
